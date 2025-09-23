export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export const CLAIM_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: 'http://localhost:8080/api/login',
  
  // Users
  GET_ALL_USERS: 'http://localhost:8080/api/users',
  GET_USER_BY_USERNAME: 'http://localhost:8080/api/users/username', // Need to check if this exists
  GET_CURRENT_USER: 'http://localhost:8080/api/profile', // Using profile endpoint
  
  // Claims
  GET_ALL_CLAIMS: 'http://localhost:8080/api/claims',
  GET_USER_CLAIMS: 'http://localhost:8080/api/claims/user', // /api/claims/user/{username}
  CREATE_CLAIM: 'http://localhost:8080/api/claims/user', // /api/claims/user/{username}
  
  // Quotas
  GET_QUOTAS: 'http://localhost:8080/api/claims/quotas' // /api/claims/quotas/{username}

};