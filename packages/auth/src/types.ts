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

