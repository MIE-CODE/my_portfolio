"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authService from "@/src/services/auth.service";
import {
  ADMIN_SESSION_CLEARED_EVENT,
  clearAdminToken,
  getAdminToken,
  setAdminToken,
} from "@/src/lib/adminAuth";

type AdminAuthContextValue = {
  isAdmin: boolean;
  isLoading: boolean;
  token: string | null;
  login: (adminId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const resetSession = useCallback(() => {
    setToken(null);
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    async function verify() {
      const stored = getAdminToken();
      if (!stored) {
        setIsLoading(false);
        return;
      }
      setToken(stored);
      try {
        await authService.getMe();
        setIsAdmin(true);
      } catch {
        clearAdminToken();
        resetSession();
      } finally {
        setIsLoading(false);
      }
    }
    verify();
  }, [resetSession]);

  useEffect(() => {
    const onCleared = () => resetSession();
    window.addEventListener(ADMIN_SESSION_CLEARED_EVENT, onCleared);
    return () =>
      window.removeEventListener(ADMIN_SESSION_CLEARED_EVENT, onCleared);
  }, [resetSession]);

  const login = useCallback(async (adminId: string, password: string) => {
    const { token: newToken } = await authService.login(adminId, password);
    setAdminToken(newToken);
    setToken(newToken);
    setIsAdmin(true);
  }, []);

  const logout = useCallback(async () => {
    clearAdminToken();
    resetSession();
    try {
      await authService.logout();
    } catch {
      /* already cleared locally */
    }
  }, [resetSession]);

  const value = useMemo(
    () => ({ isAdmin, isLoading, token, login, logout }),
    [isAdmin, isLoading, token, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
