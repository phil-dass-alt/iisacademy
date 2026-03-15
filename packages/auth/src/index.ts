export { getAuthConfig } from "./config";
export { AuthProvider } from "./AuthProvider";
export {
  getMembershipAccess,
  canAccessWing,
  canAccessBoard,
  canAccessEnhancements,
  canAccessAdaptiveQuiz,
  canAccessAnalytics,
  isMembershipExpired,
  getRequiredTierForFeature,
} from "./accessControl";
export type {
  AuthUser,
  AuthSession,
  AuthConfig,
  MembershipTier,
  MembershipAccess,
  BoardCode,
} from "./types";
