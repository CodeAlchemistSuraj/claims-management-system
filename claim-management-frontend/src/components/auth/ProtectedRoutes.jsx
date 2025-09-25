// src/components/auth/ProtectedRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Fixed import path

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Get user object
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.role === 'ROLE_ADMIN' ? children : <Navigate to="/dashboard" />;
};