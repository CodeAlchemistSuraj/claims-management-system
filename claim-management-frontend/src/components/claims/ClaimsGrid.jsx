import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Calendar, User, Building } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { mockData } from '../../data/mockData';

export const ClaimsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockData.claims.map((claim) => (
        <Link 
          key={claim.id} 
          to={`/claims/${claim.id}`}
          className="block card-overlay backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:scale-105 hover:border-teal-400/30 transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-white">{claim.claimNumber}</h3>
            <StatusBadge status={claim.status} />
          </div>
          
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{claim.patientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building size={14} />
              <span>{claim.hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{claim.dateSubmitted}</span>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="text-teal-400 font-semibold">{claim.amount}</span>
            <span className="inline-flex items-center gap-1 text-xs text-teal-300">
              <Eye size={12} />
              View Details
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};