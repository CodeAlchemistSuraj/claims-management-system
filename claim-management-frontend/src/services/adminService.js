import { API_ENDPOINTS } from '../utils/constants.js';

export const adminService = {
  createUser: async (token, userData) => {
    const response = await fetch(API_ENDPOINTS.ADMIN_USERS, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  }
};