// app/layout.tsx
import Layout from "../components/Layout";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./global.css";

export const metadata = {
  title: "Hikejam",
  description: "Hikejam is a platform for sharing hiking experiences and tips.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </Layout>
      </body>
    </html>
  );
}
