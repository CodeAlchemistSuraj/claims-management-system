import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { ClaimsTable } from '../components/claims/ClaimsTable';

export const ClaimsSection = ({ claims, onAddClaim, isAdmin = false }) => {
  return (
    <section className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-white">
          {isAdmin ? 'All Claims Management' : 'My Claims History'}
        </h2>
        <Button
          variant="success"
          className="pulse flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
          onClick={onAddClaim}
        >
          <Plus size={16} />
          <span>Add New Claim</span>
        </Button>
      </div>
      
      <ClaimsTable claims={claims} />
    </section>
  );
};