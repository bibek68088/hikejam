// src/routes/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};