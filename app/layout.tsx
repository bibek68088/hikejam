// components/Layout.tsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";
import "../app/global.css";
import { AuthProvider } from "../components/auth-provider";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Hikejam",
//   description: "Hikejam is a platform for sharing hiking experiences and tips.",
// };

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default Layout;
