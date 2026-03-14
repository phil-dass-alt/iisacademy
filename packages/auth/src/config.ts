import type { AuthConfig } from "./types";

export function getAuthConfig(): AuthConfig {
  return {
    supabaseUrl: process.env["NEXT_PUBLIC_SUPABASE_URL"],
    supabaseAnonKey: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    nextAuthSecret: process.env["NEXTAUTH_SECRET"],
    providers: ["google", "microsoft", "email"],
    redirectUrl:
      process.env["NEXT_PUBLIC_APP_URL"] ?? "https://iisacademy.com",
  };
}
