"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { useAuth } from "../../components/auth-provider";
import LoadingSpinner from "../../components/loading-spinner";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "admin") {
        router.replace("/user/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || user.role !== "admin") {
    return <LoadingSpinner />;
  }

  return <AdminDashboard />;
}
