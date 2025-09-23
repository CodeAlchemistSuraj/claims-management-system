import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-base font-medium transition ${
      location.pathname === path
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`;

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-md p-4 flex flex-col gap-3 animate-slideDown">
          <Link
            to="/dashboard"
            className={linkClass('/dashboard')}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/claims"
            className={linkClass('/claims')}
            onClick={() => setIsOpen(false)}
          >
            <FileText size={16} /> Claims
          </Link>
          {user?.role === 'ADMIN' && (
            <Link
              to="/admin"
              className={linkClass('/admin')}
              onClick={() => setIsOpen(false)}
            >
              <Shield size={16} /> Admin
            </Link>
          )}
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              navigate('/login');
              setIsOpen(false);
            }}
            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      )}
    </div>
  );
};
