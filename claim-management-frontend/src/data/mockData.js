import { CLAIM_STATUS, USER_ROLES } from '../utils/constants.js';

export const mockData = {
  claims: [
    { id: 1, claimNumber: 'CLM-2024-001', status: CLAIM_STATUS.PENDING, dateSubmitted: '2024-01-15', amount: '$2,500' },
    { id: 2, claimNumber: 'CLM-2024-002', status: CLAIM_STATUS.APPROVED, dateSubmitted: '2024-01-10', amount: '$1,800' },
    { id: 3, claimNumber: 'CLM-2024-003', status: CLAIM_STATUS.REJECTED, dateSubmitted: '2024-01-12', amount: '$950' },
    { id: 4, claimNumber: 'CLM-2024-004', status: CLAIM_STATUS.PENDING, dateSubmitted: '2024-01-18', amount: '$3,200' },
    { id: 5, claimNumber: 'CLM-2024-005', status: CLAIM_STATUS.APPROVED, dateSubmitted: '2024-01-08', amount: '$1,200' }
  ],
  
  users: [
    { id: 1, username: 'admin', role: USER_ROLES.ADMIN, created: '2024-01-01' },
    { id: 2, username: 'user1', role: USER_ROLES.USER, created: '2024-01-05' },
    { id: 3, username: 'user2', role: USER_ROLES.USER, created: '2024-01-10' }
  ],
  
  dashboardStats: {
    totalClaims: 12,
    pendingClaims: 3,
    approvedClaims: 8
  }
};