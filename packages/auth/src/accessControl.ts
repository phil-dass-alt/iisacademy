import type { AuthUser, MembershipAccess, MembershipTier, BoardCode } from "./types";

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
