import React from 'react';
import { CLAIM_STATUS } from '../../utils/constants.js';

export const StatusBadge = ({ status, className = '' }) => {
  const statusStyles = {
    [CLAIM_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [CLAIM_STATUS.APPROVED]: 'bg-green-100 text-green-800',
    [CLAIM_STATUS.REJECTED]: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'} ${className}`}>
      {status}
    </span>
  );
};