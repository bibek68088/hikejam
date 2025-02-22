// src/routes/AdminRoutes.jsx
import { Route } from 'react-router-dom';
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