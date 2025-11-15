// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return null; // or spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
