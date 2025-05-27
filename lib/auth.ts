export type UserRole = "admin" | "user";

export const signin = (role: "admin" | "user"): void => {
  localStorage.setItem("userRole", role);
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = (): void => {
  localStorage.removeItem("userRole");
  localStorage.setItem("isLoggedIn", "false");
  window.location.href = "/";
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getUserRole = (): "admin" | "user" | null => {
  const role = localStorage.getItem("userRole");
  if (role === "admin" || role === "user") return role;
  return null;
};
