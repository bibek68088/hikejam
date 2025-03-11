import { ProtectedAdminRoute } from './ProtectedAdminRoute';
import AdminDashboard from '../components/admin/AdminDashboard';

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    )
  }
];