import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { FormField } from '../components/ui/FormField';
import { Alert } from '../components/ui/Alert';
import logo from '../assets/logo.jpg'; // Adjust path to your logo image

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-purple-600 to-indigo-600 animate-gradient-bg px-4">
      <div className="card-overlay">
        <div className="w-full max-w-sm p-6 bg-white/10 backdrop-blur-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-scale-in border border-white/20">
          <img
            src={logo}
            alt="Claims Management Logo"
            className="logo mx-auto mb-4 h-12 w-auto animate-bounce"
          />
          <h2 className="text-3xl font-extrabold mb-6 text-center text-white tracking-tight">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 hover:shadow-md input-glow"
              placeholder="Enter your username"
              aria-label="Username"
            />
            <FormField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 hover:shadow-md input-glow"
              placeholder="Enter your password"
              aria-label="Password"
            />
            {error && (
              <Alert
                message={error}
                type="error"
                className="bg-red-500/20 text-red-100 border border-red-500/50 rounded-md p-3 animate-scale-in"
              />
            )}
            <Button
              variant="primary"
              type="submit"
              loading={loading}
              className="w-full px-6 py-2.5 rounded-md font-semibold text-white bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 transition-all duration-300 transform pulse focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ripple disabled:opacity-70 disabled:cursor-not-allowed input-glow"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm text-white/80 hover:text-white underline-slide transition-colors duration-200"
                aria-label="Forgot your password?"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};