export type MembershipTier = "free" | "basic" | "premium" | "school";
export type BoardCode =
  | "cbse"
  | "icse"
  | "karnataka"
  | "tamil-nadu"
  | "kerala"
  | "andhra-pradesh";

/** Supported classes for enrolment. */
export type EnrolmentClass = 8 | 9 | 10 | 11 | 12;

/** Streams available for Classes 11 and 12. */
export type SeniorStream = "science" | "commerce" | "arts";

/**
 * Payment plan identifiers.
 * - class-specific: Rs 999 + 18% GST  (aienter.in/payments/iisacademy)
 * - all-classes:    Rs 2999 + 18% GST (aienter.in/payments/iisacademy2)
 */
export type PaymentPlan = "class-specific" | "all-classes";

/**
 * Badge granted to a user after a successful payment.
 * Stored in Supabase `profiles.enrolled_badges` (JSONB array).
 */
export interface EnrolledBadge {
  plan: PaymentPlan;
  /** Enrolled class (8–12). For all-classes plan this is null. */
  enrolledClass: EnrolmentClass | null;
  /** Stream selected for Class 11/12 (null for Classes 8–10). */
  stream: SeniorStream | null;
  /** Subject list chosen at enrolment time. */
  subjects: string[];
  /** ISO timestamp of badge assignment. */
  assignedAt: string;
  /** Razorpay / aienter.in payment reference. */
  paymentRef: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "student" | "teacher" | "admin" | "school_admin";
  board?: BoardCode;
  wing?: "junior" | "senior" | "university";
  schoolId?: string;
  membershipStatus: "free" | "paid" | "expired";
  membershipExpiry?: number;
  membershipTier?: MembershipTier;
  membershipExpiresAt?: number;
  /** Authorized enrolment badges earned via payment. */
  enrolledBadges?: EnrolledBadge[];
}

export interface MembershipAccess {
  tier: MembershipTier;
  allowedWings: Array<"junior" | "senior" | "university">;
  allowedBoards: BoardCode[];
  enhancementsEnabled: boolean;
  quizAccessLevel: "basic" | "full" | "adaptive";
  analyticsEnabled: boolean;
}

export type SubscriptionStatus = 'active' | 'expired' | 'trial' | 'none';
export type UserRole = 'student' | 'teacher' | 'school_admin' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  enrolledBadges?: EnrolledBadge[];
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'high-5';
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  amountPaid: number;
  currency: 'INR';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

/** Membership plan definition (Rs 499/year). */
export interface MembershipPlan {
  id: string;
  name: string;
  priceInr: number;
  validityYears: number;
  description: string;
  paymentUrl: string;
}

/** Result of an access-control check for protected content. */
export interface AccessControlResult {
  allowed: boolean;
  reason: "paid_member" | "free_preview" | "membership_required" | "membership_expired";
  redirectUrl?: string;
}

export interface StudentProfile extends UserProfile {
  role: 'student';
  class: EnrolmentClass;
  board: 'CBSE' | 'ICSE' | 'Karnataka' | 'Tamil Nadu' | 'Kerala' | 'Andhra Pradesh';
  school?: string;
  subscription?: Subscription;
}

export interface SchoolProfile {
  id: string;
  name: string;
  board: string;
  address: string;
  contactEmail: string;
  subscriptionCount: number;
  expiryDate: string;
}

export interface AuthSession {
  user: AuthUser;
  subscription?: Subscription;
  accessToken: string;
}

export interface AuthConfig {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  nextAuthSecret?: string;
  providers: string[];
  redirectUrl: string;
}

/**
 * Payload sent by aienter.in to iisacademy.in via REST callback
 * after a successful payment.
 */
export interface PaymentCallbackPayload {
  /** HMAC-SHA256 hex signature of the payload body (excl. this field). */
  signature: string;
  /** aienter.in internal payment reference. */
  paymentRef: string;
  /** The plan the user paid for. */
  plan: PaymentPlan;
  /** Supabase user ID of the purchaser. */
  userId: string;
  /** Enrolled class (null for all-classes plan). */
  enrolledClass: EnrolmentClass | null;
  /** Stream selected for Class 11/12. */
  stream: SeniorStream | null;
  /** Subjects selected at enrolment. */
  subjects: string[];
}

