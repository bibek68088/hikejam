"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  signin as authSignin,
  logout as authLogout,
  isLoggedIn,
  getUserRole,
  UserRole,
} from "../../lib/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userRole: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const isAdmin = userRole === "admin";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(isLoggedIn());
      setUserRole(getUserRole());
    }
  }, []);
  const login = useCallback((role: UserRole) => {
    authSignin(role);
    setUserRole(role);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUserRole(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, userRole, login, logout }}
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
