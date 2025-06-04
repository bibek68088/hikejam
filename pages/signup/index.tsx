"use client";

import { AuthProvider } from "../../components/auth-provider";
import Signup from "./SignUp";

export default function NavbarPage() {
  return (
    <AuthProvider>
      <Signup />
    </AuthProvider>
  );
}
