"use client";

import { AuthProvider } from "../../components/auth-provider";
import Navbar from "./Navbar";

export default function NavbarPage() {
  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
}
