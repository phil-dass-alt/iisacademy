import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { getSupabaseAdminClient, updateGuardianEmail } from "@iisacademy/auth";

/**
 * POST /api/otp/verify
 *
 * Verifies a 6-digit OTP against the stored hash.
 * If valid and a `userId` is supplied, the guardian email and verification
 * timestamp are persisted to `profiles`.
 *
 * Body: { email: string, otp: string, purpose?: string, userId?: string }
 * Response: { verified: true } | { verified: false, error: string }
 */
export async function POST(req: NextRequest) {
  let body: {
    email?: unknown;
    otp?: unknown;
    purpose?: unknown;
    userId?: unknown;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const otp = typeof body.otp === "string" ? body.otp.trim() : "";
  const purpose =
    typeof body.purpose === "string" ? body.purpose.trim() : "guardian";
  const userId =
    typeof body.userId === "string" ? body.userId.trim() : undefined;

  if (!email || !otp) {
    return NextResponse.json(
      { verified: false, error: "email and otp are required" },
      { status: 400 }
    );
  }

  // Only allow 6-digit numeric OTPs.
  if (!/^\d{6}$/.test(otp)) {
    return NextResponse.json(
      { verified: false, error: "OTP must be a 6-digit number" },
      { status: 400 }
    );
  }

  const inputHash = createHash("sha256").update(otp).digest("hex");
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();

  // Look up the most recent valid token for this email + purpose.
  const { data: token, error: fetchError } = await supabase
    .from("otp_tokens")
    .select("id, token_hash, expires_at, used")
    .eq("email", email)
    .eq("purpose", purpose)
    .eq("used", false)
    .gt("expires_at", now)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (fetchError || !token) {
    return NextResponse.json(
      { verified: false, error: "No valid OTP found. Please request a new one." },
      { status: 400 }
    );
  }

  // Validate that the stored hash is valid hex before creating Buffer.
  const storedHash = token.token_hash as string;
  if (!/^[0-9a-f]{64}$/i.test(storedHash)) {
    return NextResponse.json(
      { verified: false, error: "Internal error. Please request a new OTP." },
      { status: 500 }
    );
  }

  // Constant-time comparison to prevent timing attacks.
  const storedBuf = Buffer.from(storedHash, "hex");
  const inputBuf = Buffer.from(inputHash, "hex");
  const match = timingSafeEqual(storedBuf, inputBuf);

  if (!match) {
    return NextResponse.json(
      { verified: false, error: "Incorrect OTP. Please try again." },
      { status: 400 }
    );
  }

  // Mark the token as used.
  await supabase
    .from("otp_tokens")
    .update({ used: true })
    .eq("id", token.id as string);

  // Persist the verified guardian email to the user's profile if userId provided.
  if (userId) {
    const result = await updateGuardianEmail(userId, email, now);
    if (!result.success) {
      console.error(
        "[otp/verify] Failed to update guardian email:",
        result.error
      );
      // OTP is valid – return success even if the profile update fails so the
      // user isn't blocked. The guardian email can be re-verified later.
    }
  }

  return NextResponse.json({ verified: true });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
