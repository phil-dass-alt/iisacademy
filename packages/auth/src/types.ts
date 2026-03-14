export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: "student" | "teacher" | "admin" | "school_admin";
  board?: "cbse" | "icse" | "state";
  wing?: "junior" | "senior" | "university";
  schoolId?: string;
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
