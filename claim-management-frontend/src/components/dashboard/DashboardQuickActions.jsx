import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const DashboardQuickActions = () => {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link to="/claims">
        <Button variant="secondary" className="w-full flex items-center gap-2">
          <FileText size={16} /> View Claims
        </Button>
      </Link>
      {user?.role === 'ADMIN' && (
        <Link to="/admin">
          <Button variant="secondary" className="w-full flex items-center gap-2">
            <Shield size={16} /> Manage Users
          </Button>
        </Link>
      )}
      <Button variant="success" className="w-full flex items-center gap-2" onClick={() => alert('Add new claim functionality to be implemented.')}>
        <Plus size={16} /> Add New Claim
      </Button>
    </div>
  );
};