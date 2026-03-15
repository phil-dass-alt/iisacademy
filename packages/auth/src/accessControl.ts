import type { AuthUser, AccessControlResult, MembershipPlan } from "./types";

/**
 * The High-5 Membership: Rs 499 + 18% GST for 5 full years of access.
 * Payment routed through aienter/payments/iisacademy.
 */
export const HIGH5_MEMBERSHIP_PLAN: MembershipPlan = {
  id: "high5-annual",
  name: "The High-5 Membership",
  priceInr: 499,
  validityYears: 5,
  description:
    "Full access to all State/CBSE/ICSE resources, Voice-AI Tutor, and Monthly Future-Skill Masterclasses for 5 full years.",
  paymentUrl: "https://aienter.in/payments/iisacademy",
};

/**
 * Returns true when the user currently holds an active paid membership.
 */
export function hasPaidAccess(user: AuthUser): boolean {
  if (user.membershipStatus !== "paid") return false;
  if (user.membershipExpiry === undefined) return false;
  return Date.now() < user.membershipExpiry;
}

/**
 * Checks whether the given user may access a content item.
 *
 * @param user          - The authenticated user (or null for anonymous visitors).
 * @param accessTier    - The content's required tier ("free" | "paid").
 * @param paymentUrl    - Override for the membership payment redirect URL.
 */
export function checkContentAccess(
  user: AuthUser | null,
  accessTier: "free" | "paid",
  paymentUrl: string = HIGH5_MEMBERSHIP_PLAN.paymentUrl
): AccessControlResult {
  if (accessTier === "free") {
    return { allowed: true, reason: "free_preview" };
  }

  if (!user) {
    return {
      allowed: false,
      reason: "membership_required",
      redirectUrl: paymentUrl,
    };
  }

  if (user.membershipStatus === "expired") {
    return {
      allowed: false,
      reason: "membership_expired",
      redirectUrl: paymentUrl,
    };
  }

  if (!hasPaidAccess(user)) {
    return {
      allowed: false,
      reason: "membership_required",
      redirectUrl: paymentUrl,
    };
  }

  return { allowed: true, reason: "paid_member" };
}
