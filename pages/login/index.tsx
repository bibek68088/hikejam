"use client";

import { AuthProvider } from "../../components/auth-provider";
import Login from "./Login";

export default function NavbarPage() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}
