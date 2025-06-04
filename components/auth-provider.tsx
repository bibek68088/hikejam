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

  useEffect(() => {
    const initAuth = () => {
      if (typeof window !== "undefined") {
        const loggedIn = isLoggedIn();
        if (loggedIn) {
          const userData = getUser();
          setUser(userData);
        }
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback((role: UserRole, userData?: Partial<User>) => {
    const newUser: User = {
      role,
      ...userData,
    };

    authSignin(role, userData);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

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
