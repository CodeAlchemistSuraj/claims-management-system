import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, AdminRoute } from "./components/auth/ProtectedRoutes";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { ClaimsPage } from "./pages/ClaimsPage";
import { AdminPage } from "./pages/AdminPage";
import { Navigation } from "./components/layout/Navigation";
import { IndividualClaimPage } from './pages/IndividualClaimPage';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
    <Navigation />
    <main className="px-10">{children}</main>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* The top-level div no longer has a background class. */}
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route
              path="/login"
              element={
                <div className="flex justify-center items-center h-screen">
                  <LoginPage />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/claims"
              element={
                <PrivateRoute>
                  <Layout>
                    <ClaimsPage />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* Add Individual Claim Route */}
            <Route
              path="/claims/:claimId"
              element={
                <PrivateRoute>
                  <Layout>
                    <IndividualClaimPage />
                  </Layout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminPage />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}