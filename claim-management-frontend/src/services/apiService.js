import { API_ENDPOINTS } from './constants';

export const apiService = {
  // Get all users (for admin)
  getUsers: async (token) => {
    const response = await fetch(API_ENDPOINTS.GET_ALL_USERS, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  },

  // Get user profile by username
  getUserProfile: async (token, username) => {
    const response = await fetch(`${API_ENDPOINTS.GET_CURRENT_USER}/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return await response.json();
  },

  // Get all claims (for admin)
  getClaims: async (token) => {
    const response = await fetch(API_ENDPOINTS.GET_ALL_CLAIMS, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch claims');
    return await response.json();
  },

  // Get claims for specific user
  getUserClaims: async (token, username) => {
    const response = await fetch(`${API_ENDPOINTS.GET_USER_CLAIMS}/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch user claims');
    return await response.json();
  },

  // Get quota information for user
  getUserQuotas: async (token, username) => {
    const response = await fetch(`${API_ENDPOINTS.GET_QUOTAS}/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch user quotas');
    return await response.json();
  },

  // Create new claim
  createClaim: async (token, username, claimData) => {
    const response = await fetch(`${API_ENDPOINTS.CREATE_CLAIM}/${username}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(claimData)
    });
    
    if (!response.ok) throw new Error('Failed to create claim');
    return await response.json();
  }
};