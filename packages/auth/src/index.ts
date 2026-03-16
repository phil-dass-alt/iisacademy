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

export {
  getSiteId,
  getSiteConfig,
  getSiteFeatures,
  isSiteAcademy,
  isSiteSkills,
} from "./tenant";

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
  SiteId,
  TenantConfig,
  SiteFeatures,
  CareerTrack,
  IISKillsBadge,
  Gender,
  RegistrationAddress,
  EmergencyContact,
  RegistrationStatus,
} from "./types";

export {
  getSupabaseClient,
  getSupabaseAdminClient,
  getUserSubscription,
  getUserSubscriptionBySite,
  checkActiveSubscription,
  checkActiveSubscriptionBySite,
  getUserProfile,
  assignEnrolledBadge,
  updateUserProfile,
  markOtpVerified,
  freezeOnboarding,
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

