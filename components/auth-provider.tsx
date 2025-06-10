"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  signin as authSignin,
  logout as authLogout,
  isLoggedIn,
  getUser,
  type User,
  type UserRole,
} from "../lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (role: UserRole, userData?: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const updateAuthState = useCallback(() => {
    if (typeof window !== "undefined") {
      const loggedIn = isLoggedIn();
      if (loggedIn) {
        const userData = getUser();
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateAuthState(); // Initial check on mount

    // Listen for storage changes (e.g., from other tabs or manual localStorage updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && (event.key === "isLoggedIn" || event.key === "userData" || event.key === "userRole")) {
        updateAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [updateAuthState]);

  const login = useCallback((role: UserRole, userData?: Partial<User>) => {
    authSignin(role, userData);
    updateAuthState(); // Update state immediately after login
  }, [updateAuthState]);

  const logout = useCallback(() => {
    authLogout();
    updateAuthState(); // Update state immediately after logout
  }, [updateAuthState]);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};