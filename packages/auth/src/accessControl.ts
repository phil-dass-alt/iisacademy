
import type { AuthUser, AccessControlResult, MembershipPlan, MembershipAccess, MembershipTier, BoardCode } from "./types";

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

/**
 * Membership tier definitions for IIS Academy.
 *
 * Free:    Read-only syllabus overview, no quizzes, no enhancements.
 * Basic:   Full syllabus + basic quizzes for one board, junior wing only.
 * Premium: Full access across all boards, all wings, all enhancements + adaptive quizzes.
 * School:  Same as Premium but scoped to an institution; analytics for school admins.
 */
const MEMBERSHIP_DEFINITIONS: Record<MembershipTier, MembershipAccess> = {
  free: {
    tier: "free",
    allowedWings: ["junior"],
    allowedBoards: ["cbse"],
    enhancementsEnabled: false,
    quizAccessLevel: "basic",
    analyticsEnabled: false,
  },
  basic: {
    tier: "basic",
    allowedWings: ["junior"],
    allowedBoards: ["cbse", "icse", "karnataka", "tamil-nadu", "kerala", "andhra-pradesh"],
    enhancementsEnabled: true,
    quizAccessLevel: "basic",
    analyticsEnabled: false,
  },
  premium: {
    tier: "premium",
    allowedWings: ["junior", "senior", "university"],
    allowedBoards: ["cbse", "icse", "karnataka", "tamil-nadu", "kerala", "andhra-pradesh"],
    enhancementsEnabled: true,
    quizAccessLevel: "adaptive",
    analyticsEnabled: true,
  },
  school: {
    tier: "school",
    allowedWings: ["junior", "senior", "university"],
    allowedBoards: ["cbse", "icse", "karnataka", "tamil-nadu", "kerala", "andhra-pradesh"],
    enhancementsEnabled: true,
    quizAccessLevel: "adaptive",
    analyticsEnabled: true,
  },
};

export function getMembershipAccess(tier: MembershipTier): MembershipAccess {
  return MEMBERSHIP_DEFINITIONS[tier];
}

export function canAccessWing(
  user: AuthUser,
  wing: "junior" | "senior" | "university"
): boolean {
  if (user.role === "admin" || user.role === "school_admin") return true;
  const tier = user.membershipTier ?? "free";
  if (isMembershipExpired(user)) return tier === "free" && wing === "junior";
  return MEMBERSHIP_DEFINITIONS[tier].allowedWings.includes(wing);
}

export function canAccessBoard(user: AuthUser, board: BoardCode): boolean {
  if (user.role === "admin" || user.role === "school_admin") return true;
  const tier = user.membershipTier ?? "free";
  if (isMembershipExpired(user)) return tier === "free" && board === "cbse";
  return MEMBERSHIP_DEFINITIONS[tier].allowedBoards.includes(board);
}

export function canAccessEnhancements(user: AuthUser): boolean {
  if (user.role === "admin" || user.role === "school_admin") return true;
  const tier = user.membershipTier ?? "free";
  if (isMembershipExpired(user)) return false;
  return MEMBERSHIP_DEFINITIONS[tier].enhancementsEnabled;
}

export function canAccessAdaptiveQuiz(user: AuthUser): boolean {
  if (user.role === "admin" || user.role === "school_admin") return true;
  const tier = user.membershipTier ?? "free";
  if (isMembershipExpired(user)) return false;
  return MEMBERSHIP_DEFINITIONS[tier].quizAccessLevel === "adaptive";
}

export function canAccessAnalytics(user: AuthUser): boolean {
  if (user.role === "admin" || user.role === "school_admin") return true;
  const tier = user.membershipTier ?? "free";
  if (isMembershipExpired(user)) return false;
  return MEMBERSHIP_DEFINITIONS[tier].analyticsEnabled;
}

export function isMembershipExpired(user: AuthUser): boolean {
  if (user.role === "admin") return false;
  if (!user.membershipExpiresAt) return true;
  return Date.now() > user.membershipExpiresAt;
}

export function getRequiredTierForFeature(
  feature: "enhancements" | "adaptive-quiz" | "analytics" | "senior-wing" | "university-wing"
): MembershipTier {
  switch (feature) {
    case "enhancements":
      return "basic";
    case "adaptive-quiz":
      return "premium";
    case "analytics":
      return "premium";
    case "senior-wing":
      return "premium";
    case "university-wing":
      return "premium";
    default:
      return "free";
  }
}
