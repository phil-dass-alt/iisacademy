export type MembershipTier = "free" | "basic" | "premium" | "school";
export type BoardCode =
  | "cbse"
  | "icse"
  | "karnataka"
  | "tamil-nadu"
  | "kerala"
  | "andhra-pradesh";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "student" | "teacher" | "admin" | "school_admin";

  board?: "cbse" | "icse" | "kseab" | "tnscert" | "kerala" | "state";
  wing?: "junior" | "senior" | "university";
  schoolId?: string;
  membershipStatus: "free" | "paid" | "expired";
  membershipExpiry?: number;

  board?: BoardCode;
  wing?: "junior" | "senior" | "university";
  schoolId?: string;
  membershipTier?: MembershipTier;
  membershipExpiresAt?: number;

}

export interface MembershipAccess {
  tier: MembershipTier;
  allowedWings: Array<"junior" | "senior" | "university">;
  allowedBoards: BoardCode[];
  enhancementsEnabled: boolean;
  quizAccessLevel: "basic" | "full" | "adaptive";
  analyticsEnabled: boolean;

export type SubscriptionStatus = 'active' | 'expired' | 'trial' | 'none';
export type UserRole = 'student' | 'teacher' | 'school_admin' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;

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
  class: 8 | 9 | 10 | 11 | 12;
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
  user: UserProfile;
  subscription?: Subscription;
  accessToken: string;
}


