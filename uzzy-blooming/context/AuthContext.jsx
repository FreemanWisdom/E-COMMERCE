"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser, getSession, signOut as authSignOut, onAuthStateChange } from "../lib/supabase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        setUser(currentUser);

        // Sync cookie for middleware on initial load
        const { session } = await getSession();
        if (session) {
          document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`;
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { unsubscribe } = onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (_event === "SIGNED_OUT") {
        document.cookie =
          "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      } else if (
        (_event === "SIGNED_IN" || _event === "TOKEN_REFRESHED") &&
        session
      ) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`;
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
    router.push("/auth/login");
    router.refresh();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
