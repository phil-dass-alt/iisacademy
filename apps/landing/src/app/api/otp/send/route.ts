import { NextRequest, NextResponse } from "next/server";
import { createHash, randomInt } from "crypto";
import { getSupabaseAdminClient } from "@iisacademy/auth";
import nodemailer from "nodemailer";

/** OTP validity window in minutes. */
const OTP_EXPIRY_MINUTES = 10;

/**
 * Create a nodemailer transporter from environment variables.
 * Falls back to a no-op console transport when SMTP settings are absent
 * (useful for local development / CI).
 */
function createTransporter() {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: process.env.EMAIL_SECURE === "true",
      auth: { user, pass },
    });
  }

  // Development fallback – log OTP to console instead of sending.
  return nodemailer.createTransport({ jsonTransport: true });
}

/**
 * POST /api/otp/send
 *
 * Generates a 6-digit OTP, stores its SHA-256 hash in `otp_tokens`, and
 * e-mails the code to the provided guardian/parent address.
 *
 * Body: { email: string, purpose?: string }
 * Response: { success: true } | { error: string }
 */
export async function POST(req: NextRequest) {
  let body: { email?: unknown; purpose?: unknown };
  try {
    body = (await req.json()) as { email?: unknown; purpose?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const purpose =
    typeof body.purpose === "string" ? body.purpose.trim() : "guardian";

  if (!email) {
    return NextResponse.json(
      { error: "email is required" },
      { status: 400 }
    );
  }

  // Basic RFC 5322-ish format check.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  // Generate a 6-digit numeric OTP.
  const otp = String(randomInt(100000, 999999));
  const tokenHash = createHash("sha256").update(otp).digest("hex");
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  // Invalidate any previous unused tokens for this email + purpose.
  const supabase = getSupabaseAdminClient();
  await supabase
    .from("otp_tokens")
    .update({ used: true })
    .eq("email", email)
    .eq("purpose", purpose)
    .eq("used", false);

  // Insert the new token.
  const { error: insertError } = await supabase.from("otp_tokens").insert({
    email,
    token_hash: tokenHash,
    purpose,
    expires_at: expiresAt,
  });

  if (insertError) {
    console.error("[otp/send] DB insert error:", insertError.message);
    return NextResponse.json(
      { error: "Failed to generate OTP. Please try again." },
      { status: 500 }
    );
  }

  // Send (or log) the OTP.
  const from =
    process.env.EMAIL_FROM ?? "IIS Academy <no-reply@iisacademy.in>";
  const transporter = createTransporter();

  const mailOptions = {
    from,
    to: email,
    subject: "IIS Academy – Guardian Email Verification Code",
    text: [
      `Your IIS Academy verification code is: ${otp}`,
      "",
      `This code expires in ${OTP_EXPIRY_MINUTES} minutes.`,
      "If you did not request this, please ignore this email.",
    ].join("\n"),
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#4f46e5">IIS Academy – Email Verification</h2>
        <p>Use the code below to verify the guardian/parent email address:</p>
        <div style="font-size:2rem;font-weight:bold;letter-spacing:0.25em;
                    background:#f3f4f6;border-radius:8px;padding:16px 24px;
                    display:inline-block;margin:12px 0">
          ${otp}
        </div>
        <p style="color:#6b7280;font-size:0.875rem">
          This code expires in ${OTP_EXPIRY_MINUTES} minutes.<br>
          If you did not request this, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // When using the jsonTransport fallback, log OTP for development.
    if (process.env.EMAIL_HOST === undefined) {
      console.info(
        `[otp/send] DEV MODE – OTP for ${email}: ${otp}`,
        (info as { message?: string }).message ?? ""
      );
    }
  } catch (mailErr) {
    console.error("[otp/send] Failed to send email:", mailErr);
    return NextResponse.json(
      { error: "Failed to send OTP email. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
