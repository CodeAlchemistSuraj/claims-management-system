import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ClaimsTable } from '../components/claims/ClaimsTable';

const mockClaims = [
  {
    srNo: 1,
    claimCount: 'CLM001',
    year: 2025,
    patient: 'Self',
    hospital: 'Apollo Hospital',
    coverage: 'CGHS',
    disease: 'Cardiac Surgery',
    admission: '2025-01-10',
    discharge: '2025-01-15',
    days: 5,
    claimAmount: '₹1,00,000',
    roomRent: '₹10,000',
    nonPayable: '₹5,000',
    payable: '₹95,000',
    status: 'Approved'
  },
  {
    srNo: 2,
    claimCount: 'CLM002',
    year: 2025,
    patient: 'Spouse',
    hospital: 'Max Hospital',
    coverage: 'CGHS',
    disease: 'Arthroscopy',
    admission: '2025-02-01',
    discharge: '2025-02-03',
    days: 2,
    claimAmount: '₹50,000',
    roomRent: '₹5,000',
    nonPayable: '₹2,000',
    payable: '₹48,000',
    status: 'Pending'
  },
];

export const ClaimsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClaims = mockClaims.filter(claim =>
    claim.claimCount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full animate-scale-in">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Claims Management</h1>
            <p className="text-lg text-white/80">View and manage all medical claims</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="success"
              className="pulse flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              onClick={() => alert('Add new claim functionality to be implemented.')}
            >
              <Plus size={16} />
              <span>Add New Claim</span>
            </Button>
            <Button
              variant="secondary"
              className="pulse flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Search className="text-teal-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Search Claims</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by claim ID, patient, hospital, disease, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-teal-400 transition-colors"
            />
            <Search className="absolute right-3 top-3 text-white/50" size={20} />
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <section className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
        <ClaimsTable claims={filteredClaims} />
      </section>
    </div>
  );
};