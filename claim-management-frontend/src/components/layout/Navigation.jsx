import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { USER_ROLES } from '../../utils/constants';

export const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Only log in development

    console.log('Navigation - User role:', user?.role);
    console.log('Navigation - Should show admin link:', user?.role === USER_ROLES.ADMIN);
  

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout(); 
    navigate('/login');
    // Force a page reload to ensure state is cleared
    window.location.reload();
  };

  const linkClass = (path) =>
    `flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? 'bg-white/20 text-white'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl shadow-lg card-overlay">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left Side - Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-white">
          ClaimsApp
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-4">
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            Dashboard
          </Link>
          <Link to="/claims" className={linkClass('/claims')}>
            <FileText size={16} /> Claims
          </Link>
          {user?.role === USER_ROLES.ADMIN && (
            <Link to="/admin" className={linkClass('/admin')}>
              <Shield size={16} /> Admin
            </Link>
          )}
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-white/80 text-sm">Welcome, {user.username || user.name}</span>
          )}
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            onClick={handleLogout}
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};