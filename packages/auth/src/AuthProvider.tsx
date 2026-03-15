"use client";
import React, { createContext, useContext, useState } from "react";
import type { AuthUser, AuthSession } from "./types";

interface AuthContextValue {
  session: AuthSession | null;
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn(email: string, _password: string) {
    setIsLoading(true);
    try {
      // Placeholder: Replace with Supabase/NextAuth implementation
      const mockSession: AuthSession = {
        user: {
          id: "mock-user-id",
          email,
          role: "student",
          board: "cbse",
          wing: "senior",
        },
        token: "mock-token",
        expiresAt: Date.now() + 86400000,
      };
      setSession(mockSession);
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, signIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
