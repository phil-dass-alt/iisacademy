export { getAuthConfig } from "./config";

export { AuthProvider, useAuth } from "./AuthProvider";
export { hasPaidAccess, checkContentAccess, HIGH5_MEMBERSHIP_PLAN } from "./accessControl";
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
  MembershipTier,
  MembershipAccess,
  BoardCode,
  EnrolmentClass,
  SeniorStream,
  PaymentPlan,
  EnrolledBadge,
  PaymentCallbackPayload,
} from "./types";

export {
  getSupabaseClient,
  getSupabaseAdminClient,
  getUserSubscription,
  checkActiveSubscription,
  getUserProfile,
  assignEnrolledBadge,
} from './supabase';
export { authOptions } from './authOptions';
export { requireAuth, requireSubscription } from './middleware';
export type {
  UserProfile,
  Subscription,
  StudentProfile,
  SchoolProfile,
  SubscriptionStatus,
  UserRole,
} from './types';

