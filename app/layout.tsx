// app/layout.tsx
import Layout from "../components/Layout";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./global.css";

// export const metadata: Metadata = {
//   title: "HikeJam - Your Hiking Adventure",
//   description: "Discover and plan your next hiking adventure with HikeJam",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
