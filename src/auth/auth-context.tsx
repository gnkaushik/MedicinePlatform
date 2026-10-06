"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { signInWithMockService } from "@/auth/service";
import type { AuthSession, AuthUser, SignInCredentials } from "@/auth/types";

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
};

const SESSION_KEY = "medicine-platform-session";
const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(storage: Storage): AuthSession | null {
  try {
    const value = storage.getItem(SESSION_KEY);
    return value ? (JSON.parse(value) as AuthSession) : null;
  } catch {
    storage.removeItem(SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = readSession(window.localStorage) ?? readSession(window.sessionStorage);
    setUser(session?.user ?? null);
    setIsReady(true);
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const session = await signInWithMockService(credentials);
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);

    const storage = credentials.rememberMe ? window.localStorage : window.sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session.user);
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, isReady, signIn, signOut }), [user, isReady, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
