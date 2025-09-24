import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';
import { tokenUtils } from '../utils/tokenUtils.js';
import { userUtils } from '../utils/userUtils.js';
import { USER_ROLES } from '../utils/constants.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(tokenUtils.get());
  const [user, setUser] = useState(userUtils.get());
  const [loading, setLoading] = useState(false);

  // Only log in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthContext - Current token:', token);
      console.log('AuthContext - Current user:', user);
    }
  }, [token, user]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await authService.login(username, password);
      const userInfo = tokenUtils.decode(data.token) || { username, role: USER_ROLES.USER };
      
      setToken(data.token);
      setUser(userInfo);
      tokenUtils.store(data.token);
      userUtils.store(userInfo);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Logout function called');
    }
    setToken(null);
    setUser(null);
    tokenUtils.remove();
    userUtils.remove();
  };

  const value = {
    token,
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'ROLE_ADMIN'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};