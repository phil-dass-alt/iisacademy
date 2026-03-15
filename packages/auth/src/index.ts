export { getAuthConfig } from "./config";
export { AuthProvider, useAuth } from "./AuthProvider";
export { hasPaidAccess, checkContentAccess, HIGH5_MEMBERSHIP_PLAN } from "./accessControl";
export type {
  AuthUser,
  AuthSession,
  AuthConfig,
  MembershipPlan,
  AccessControlResult,
} from "./types";
