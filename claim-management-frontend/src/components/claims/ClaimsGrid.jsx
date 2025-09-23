import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { mockData } from '../../data/mockData';

export const ClaimsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockData.claims.map((claim) => (
        <div key={claim.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">{claim.claimNumber}</h3>
          <p className="text-sm text-gray-500">Submitted: {claim.dateSubmitted}</p>
          <StatusBadge status={claim.status} className="mt-2" />
        </div>
      ))}
    </div>
  );
};