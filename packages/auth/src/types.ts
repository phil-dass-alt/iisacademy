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
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

export interface AuthConfig {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  nextAuthSecret?: string;
  providers: Array<"google" | "microsoft" | "email">;
  redirectUrl: string;
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
