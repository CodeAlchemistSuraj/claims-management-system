// src/components/admin/UsersTable.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Search, Edit, Trash2, User, Shield, Mail, Phone, Calendar } from 'lucide-react';

export const UsersTable = ({ users, onUserUpdated }) => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        setMessage('User deleted successfully');
        if (onUserUpdated) onUserUpdated();
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...user,
          isAlive: !user.isAlive
        })
      });

      if (response.ok) {
        setMessage(`User ${user.isAlive ? 'deactivated' : 'activated'} successfully`);
        if (onUserUpdated) onUserUpdated();
      } else {
        throw new Error('Failed to update user status');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-white/50" size={20} />
        <input
          type="text"
          placeholder="Search users by name, username, department, or employee code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
        />
      </div>

      {message && (
        <div className={`p-3 rounded-lg ${
          message.includes('success') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {message}
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-full divide-y divide-white/10">
          <thead className="bg-black/30">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">User Info</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Employment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-black/10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="text-white" size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-white/60 text-sm">{user.username}</div>
                        <div className="text-white/40 text-xs flex items-center gap-1 mt-1">
                          <Mail size={12} />
                          {user.email || 'No email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-purple-400" />
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'ADMIN' 
                            ? 'bg-purple-500/20 text-purple-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {user.role || 'USER'}
                        </span>
                      </div>
                      <div className="text-white/80 text-sm">{user.department}</div>
                      <div className="text-white/60 text-xs">ID: {user.employeeCode}</div>
                      <div className="text-white/40 text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {user.startDate ? new Date(user.startDate).toLocaleDateString() : 'No start date'}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.isAlive !== false 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {user.isAlive !== false ? 'Active' : 'Inactive'}
                      </span>
                      <div className="text-white/60 text-xs">
                        Type: {user.type === 'pensioner' ? 'Pensioner' : 'Employee'}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        className="text-xs px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300"
                        onClick={() => alert('Edit functionality to be implemented')}
                      >
                        <Edit size={14} />
                        Edit
                      </Button>
                      
                      <Button
                        variant={user.isAlive !== false ? "danger" : "success"}
                        className="text-xs px-3 py-1"
                        onClick={() => handleToggleStatus(user)}
                        loading={loading}
                      >
                        {user.isAlive !== false ? 'Deactivate' : 'Activate'}
                      </Button>
                      
                      <Button
                        variant="danger"
                        className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                        onClick={() => handleDeleteUser(user.id)}
                        loading={loading}
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-white/60">
                  {users.length === 0 ? 'No users found.' : 'No users match your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="flex justify-between items-center text-white/60 text-sm">
        <span>Showing {filteredUsers.length} of {users.length} users</span>
        <span>Admin users: {users.filter(u => u.role === 'ADMIN').length}</span>
      </div>
    </div>
  );
};