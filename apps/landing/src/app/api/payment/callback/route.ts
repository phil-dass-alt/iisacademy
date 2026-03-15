import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { assignEnrolledBadge } from "@iisacademy/auth";
import type { PaymentCallbackPayload, EnrolledBadge } from "@iisacademy/auth";

/**
 * POST /api/payment/callback
 *
 * Receives a payment-success notification from aienter.in after a user
 * completes checkout on aienter.in/payments/iisacademy (₹999 plan) or
 * aienter.in/payments/iisacademy2 (₹2999 plan).
 *
 * Security:
 *   - The request body is signed with HMAC-SHA256 using the shared secret
 *     stored in PAYMENT_CALLBACK_SECRET.
 *   - A timing-safe comparison prevents timing attacks.
 *   - Only POST is accepted; all other methods return 405.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.PAYMENT_CALLBACK_SECRET;
  if (!secret) {
    console.error("[payment/callback] PAYMENT_CALLBACK_SECRET is not set.");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  // Read raw body for HMAC verification.
  const rawBody = await req.text();

  let payload: PaymentCallbackPayload;
  try {
    payload = JSON.parse(rawBody) as PaymentCallbackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields before verifying the signature.
  if (
    !payload.paymentRef ||
    !payload.plan ||
    !payload.userId ||
    !payload.signature
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Build the canonical string that was signed by aienter.in.
  // We sign everything except the signature field itself.
  const { signature, ...rest } = payload;
  const canonicalBody = JSON.stringify(rest);
  const expectedHmac = createHmac("sha256", secret)
    .update(canonicalBody)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks.
  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedHmac, "hex");
  const isValid =
    sigBuffer.length === expectedBuffer.length &&
    timingSafeEqual(sigBuffer, expectedBuffer);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Build the badge that will be stored in Supabase.
  const badge: EnrolledBadge = {
    plan: payload.plan,
    enrolledClass: payload.enrolledClass,
    stream: payload.stream,
    subjects: payload.subjects ?? [],
    assignedAt: new Date().toISOString(),
    paymentRef: payload.paymentRef,
  };

  const result = await assignEnrolledBadge(payload.userId, badge);

  if (!result.success) {
    console.error(
      "[payment/callback] Failed to assign badge:",
      result.error,
      { userId: payload.userId, paymentRef: payload.paymentRef }
    );
    return NextResponse.json(
      { error: "Badge assignment failed", detail: result.error },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { message: "Badge assigned successfully", paymentRef: payload.paymentRef },
    { status: 200 }
  );
}

// Reject all other HTTP methods.
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
