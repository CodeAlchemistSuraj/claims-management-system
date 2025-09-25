import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { CLAIM_STATUS } from '../../utils/constants';

export const ClaimsTable = ({ claims = [] }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full min-w-full divide-y divide-white/10">
        <thead className="bg-black/30">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Sr No.</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Claim ID</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Patient</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Hospital</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Amount</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Status</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-white/80 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-black/10">
          {claims.length ? (
            claims.map((claim) => (
              <tr key={claim.srNo} className="hover:bg-white/5 transition-colors">
                <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.srNo}</td>
                
                {/* Make Claim ID clickable */}
                <td className="px-3 py-2 whitespace-nowrap">
                  <Link 
                    to={`/claims/${claim.srNo}`}
                    className="font-medium text-teal-400 hover:text-teal-300 hover:underline transition"
                  >
                    {claim.claimCount}
                  </Link>
                </td>
                
                <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.patient}</td>
                <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.hospital}</td>
                <td className="px-3 py-2 whitespace-nowrap text-green-400 font-semibold">{claim.claimAmount}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    claim.status === CLAIM_STATUS.APPROVED 
                      ? 'bg-green-500/20 text-green-300'
                      : claim.status === CLAIM_STATUS.PENDING
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {claim.status}
                  </span>
                </td>
                
                {/* Updated Actions button with Link */}
                <td className="px-3 py-2 whitespace-nowrap">
                  <Link 
                    to={`/claims/${claim.srNo}`}
                    className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1 rounded transition"
                  >
                    <Eye size={12} />
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-3 py-4 text-center text-white/60">
                No claims found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};