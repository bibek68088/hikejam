"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "./auth"; 

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/login"); // redirect if not admin
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return <p>Loading...</p>; // or a spinner
  }

  return <AdminDashboard />;
}
