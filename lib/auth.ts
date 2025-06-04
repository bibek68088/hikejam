export type UserRole = "admin" | "user";

export interface User {
  role: UserRole;
  email?: string;
  name?: string;
}

export const signin = (role: UserRole, userData?: Partial<User>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);

    // Set cookies for middleware
    document.cookie = `isLoggedIn=true; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24 * 7}`;

    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    // Clear cookies
    document.cookie =
      "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie =
      "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getUserRole = (): UserRole | null => {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem("userRole");
  return role as UserRole | null;
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const role = getUserRole();
  if (!role) return null;

  const userData = localStorage.getItem("userData");
  const parsedData = userData ? JSON.parse(userData) : {};

  return {
    role,
    ...parsedData,
  };
};
