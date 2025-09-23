import { API_ENDPOINTS } from '../utils/constants.js';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed. Please check your credentials.');
      }

      return await response.json();
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the server. Please check your network or server settings.');
      }
      throw error;
    }
  },

  testProtectedEndpoint: async (token) => {
    const response = await fetch(API_ENDPOINTS.PROTECTED_HELLO, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch protected endpoint');
    }

    return await response.text();
  }
};