"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserDashboard from "./UserDashboard";
import { useAuth } from "../../../components/auth-provider";
import LoadingSpinner from "../../../components/loading-spinner";

export default function UserDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role === "admin") {
        router.replace("/admin/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "user") {
    return <LoadingSpinner />;
  }

  return <UserDashboard />;
}
