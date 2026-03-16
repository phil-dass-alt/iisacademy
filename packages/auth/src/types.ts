export type MembershipTier = "free" | "basic" | "premium" | "school";

/**
 * Gender options for registration.
 * Once set, this field is never editable.
 */
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

/**
 * Physical address stored for a registrant.
 * Two variants are kept: permanent residence and communication address.
 * Both are editable until "Freeze & Pay" is completed.
 */
export interface RegistrationAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

/**
 * Emergency / secondary contact for the student's parent or guardian.
 * Editable until "Freeze & Pay" is completed.
 */
export interface EmergencyContact {
  name: string;
  phone: string;
}

/**
 * Tracks the onboarding gate status for a student profile.
 *
 * - `pending`  – initial registration; all fields still editable.
 * - `otp_verified` – OTP has been confirmed; name, DOB, guardian & gender are
 *                    now locked.
 * - `frozen`   – "Freeze & Pay" completed; contact info, addresses and
 *                emergency contact are now locked in addition.
 */
export type RegistrationStatus = "pending" | "otp_verified" | "frozen";
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
export type SeniorStream = "science" | "commerce" | "arts" | "engineering";

/**
 * Identifies which platform/site the entity belongs to.
 * Both sites share a single Supabase project; rows are separated by this field.
 */
export type SiteId = "iisacademy" | "iiskills";

/** Career tracks available on iiskills.cloud. */
export type CareerTrack =
  | "software-engineering"
  | "data-science"
  | "design"
  | "marketing"
  | "finance"
  | "entrepreneurship"
  | "healthcare"
  | "civil-services";

/**
 * Feature flags specific to each site/domain.
 * Resolved at runtime from the current hostname.
 */
export interface SiteFeatures {
  /** Show class (8–12) selector – iisacademy only. */
  classSelector: boolean;
  /** Show stream (science, commerce, arts, engineering) – iisacademy only. */
  streamSelector: boolean;
  /** Show academic board selector – iisacademy only. */
  boardSelector: boolean;
  /** B2B school portal available for this site. */
  b2bPortal: boolean;
  /** Voice-AI tutor available for this site. */
  voiceAi: boolean;
  /** Career-track selector – iiskills only. */
  careerTracks: boolean;
  /** Professional certifications section – iiskills only. */
  certifications: boolean;
}

/**
 * Per-site configuration resolved from the current domain.
 * Both sites share the same Supabase project URL and anon key.
 */
export interface TenantConfig {
  siteId: SiteId;
  name: string;
  domain: string;
  portalDomain: string;
  adminDomain: string;
  b2bDomain: string;
  features: SiteFeatures;
}

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
  /** Site that issued this badge. Defaults to "iisacademy" for legacy rows. */
  siteId?: SiteId;
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

/**
 * Enrollment badge for iiskills.cloud career-track purchases.
 * Stored in Supabase `profiles.enrolled_badges` (JSONB array) alongside
 * iisacademy badges; discriminated by `siteId: "iiskills"`.
 */
export interface IISKillsBadge {
  siteId: "iiskills";
  /** Career track the learner enrolled in. */
  careerTrack: CareerTrack;
  /** ISO timestamp of badge assignment. */
  assignedAt: string;
  /** Payment reference. */
  paymentRef: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "student" | "teacher" | "admin" | "school_admin";
  /** Site this user primarily belongs to. */
  siteId?: SiteId;
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
  /** Full name – must match TC/Aadhaar; locked after OTP verification. */
  name: string;
  role: UserRole;
  /** Site this profile belongs to. Defaults to "iisacademy" for legacy rows. */
  siteId?: SiteId;
  avatarUrl?: string;
  createdAt: string;
  enrolledBadges?: EnrolledBadge[];

  /** Verified guardian/parent email address. Set after OTP verification. */
  guardianEmail?: string;
  /** ISO timestamp of when the guardian email OTP was verified. */
  guardianOtpVerifiedAt?: string;


  // ── Permanent fields (locked after OTP or never editable) ──────────────────
  /** Auto-generated permanent identifier, e.g. "IIS-2026-00000001". Never editable. */
  registrationUid?: string;
  /** Date of birth (ISO date string "YYYY-MM-DD"). Locked after OTP verification. */
  dateOfBirth?: string;
  /** Gender. Never editable once set. */
  gender?: Gender;
  /** Primary guardian / parent full name. Locked after OTP verification. */
  guardianName?: string;

  // ── Onboarding gate timestamps ─────────────────────────────────────────────
  /** ISO timestamp of OTP verification. Once set, name/DOB/guardian/gender are locked. */
  otpVerifiedAt?: string;
  /** ISO timestamp of "Freeze & Pay" completion. Once set, contact/address/emergency fields are locked. */
  onboardingFrozenAt?: string;

  // ── Conditionally-editable fields (locked after "Freeze & Pay") ────────────
  /** Primary mobile phone number. OTP verification required on change. */
  phone?: string;
  /** Permanent residential address. */
  addressPermanent?: RegistrationAddress;
  /** Communication / mailing address. */
  addressCommunication?: RegistrationAddress;
  /**
   * Secondary emergency contact (parent/guardian).
   * Stored in the DB as two scalar columns (`emergency_contact_name` and
   * `emergency_contact_phone`); the Supabase client layer decomposes/recomposes
   * the object automatically.
   */
  emergencyContact?: EmergencyContact;

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
  /** Academic stream (iisacademy, Classes 11–12 only). */
  stream?: SeniorStream;
  board: 'CBSE' | 'ICSE' | 'Karnataka' | 'Tamil Nadu' | 'Kerala' | 'Andhra Pradesh';
  school?: string;
  /** Career track (iiskills only). */
  careerTrack?: CareerTrack;
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

