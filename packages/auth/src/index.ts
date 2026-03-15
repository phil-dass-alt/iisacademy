export { getAuthConfig } from "./config";

export { AuthProvider, useAuth } from "./AuthProvider";
export { hasPaidAccess, checkContentAccess, HIGH5_MEMBERSHIP_PLAN } from "./accessControl";

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

  MembershipPlan,
  AccessControlResult,
} from "./types";

  MembershipTier,
  MembershipAccess,
  BoardCode,
} from "./types";

export { getSupabaseClient, getSupabaseAdminClient, getUserSubscription, checkActiveSubscription } from './supabase';
export { authOptions } from './authOptions';
export { requireAuth, requireSubscription } from './middleware';
export type { UserProfile, Subscription, StudentProfile, SchoolProfile, AuthSession, SubscriptionStatus, UserRole } from './types';


