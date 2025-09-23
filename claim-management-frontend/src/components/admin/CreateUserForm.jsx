import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { adminService } from '../../services/adminService';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { Alert } from '../ui/Alert';

export const CreateUserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await adminService.createUser(token, { username, password });
      setMessage('User added successfully.');
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Username"
          id="new-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormField
          label="Password"
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="primary" type="submit" loading={loading}>
          {loading ? 'Adding...' : 'Add User'}
        </Button>
      </form>
      {message && <Alert message={message} type={message.includes('success') ? 'success' : 'error'} className="mt-4" />}
    </div>
  );
};