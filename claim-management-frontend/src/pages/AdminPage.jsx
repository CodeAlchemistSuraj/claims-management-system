import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CreateUserForm } from '../components/admin/CreateUserForm';
import { UsersTable } from '../components/admin/UsersTable';
import { Navigation } from '../components/layout/Navigation';
import { MobileMenu } from '../components/layout/MobileMenu';

export const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="md:hidden p-4">
        <MobileMenu />
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
        <CreateUserForm />
        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Existing Users</h2>
        <UsersTable />
      </div>
    </div>
  );
};