import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Plus, FileText, User, Folder, Clock, CheckCircle, Search, LogOut } from 'lucide-react';

const mockUsers = [
  { id: 'EMP001', name: 'Rajesh Kumar', type: 'Active Employee', department: 'IT' },
  { id: 'EMP002', name: 'Priya Sharma', type: 'Active Employee', department: 'HR' },
  { id: 'PEN001', name: 'Suresh Gupta', type: 'Pensioner', department: 'Retired' },
  { id: 'PEN002', name: 'Meera Devi', type: 'Pensioner', department: 'Retired' },
  { id: 'EMP003', name: 'Amit Singh', type: 'Active Employee', department: 'Finance' },
  { id: 'EMP004', name: 'Neha Patel', type: 'Active Employee', department: 'Operations' },
];

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

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchClaim, setSearchClaim] = useState('');

  // Filter users based on search
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    user.id.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    user.department.toLowerCase().includes(searchEmployee.toLowerCase())
  );

  // Filter claims based on search
  const filteredClaims = mockClaims.filter(claim =>
    claim.claimCount.toLowerCase().includes(searchClaim.toLowerCase()) ||
    claim.patient.toLowerCase().includes(searchClaim.toLowerCase()) ||
    claim.hospital.toLowerCase().includes(searchClaim.toLowerCase()) ||
    claim.disease.toLowerCase().includes(searchClaim.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full animate-scale-in">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Claims Management System
        </h1>
        <p className="text-lg text-white/80">
          Employee & Pensioner Medical and Pension Claims Tracking
        </p>
      </div>

      {/* Search Section */}
      <section className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Employee Search */}
        <div className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Search className="text-purple-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Search Employees</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchEmployee}
              onChange={(e) => setSearchEmployee(e.target.value)}
              className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <Search className="absolute right-3 top-3 text-white/50" size={20} />
          </div>
        </div>

        {/* Claims Search */}
        <div className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Search className="text-pink-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Search Claims</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by claim ID, patient, hospital, or disease..."
              value={searchClaim}
              onChange={(e) => setSearchClaim(e.target.value)}
              className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition-colors"
            />
            <Search className="absolute right-3 top-3 text-white/50" size={20} />
          </div>
        </div>
      </section>

      {/* User Selection Grid */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Select User Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl pulse border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedUser(u)}
            >
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                u.type === 'Active Employee' ? 'bg-teal-500/20 text-teal-300' : 'bg-purple-500/20 text-purple-300'
              }`}>
                {u.type}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">{u.name}</h3>
              <p className="text-white/60 text-sm">ID: {u.id}</p>
              <p className="text-white/50 text-xs mt-1">Dept: {u.department}</p>
              <Button
                variant="primary"
                className="w-full mt-3 text-sm pulse bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(u);
                }}
              >
                Select Profile
              </Button>
            </div>
          ))}
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center text-white/60 py-8">
            No employees found matching your search.
          </div>
        )}
      </section>

      {selectedUser && (
        <div className="space-y-6">
          {/* Profile & Service Info */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <User size={20} />
                Profile Information
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Name:</span>
                  <span className="text-white font-medium">{selectedUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">ID:</span>
                  <span className="text-white font-medium">{selectedUser.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Type:</span>
                  <span className="text-white font-medium">{selectedUser.type}</span>
                </div>
              </div>
            </div>

            <div className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <FileText size={20} />
                Service Information
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Department:</span>
                  <span className="text-white font-medium">{selectedUser.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status:</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quota Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card-border p-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Lifetime Quota</h2>
              <p className="text-2xl font-bold text-teal-300">₹50,00,000</p>
              <p className="text-white/60 text-sm">Remaining: ₹50,00,000</p>
              <div className="mt-2 bg-gray-200/20 rounded-full h-2">
                <div className="bg-teal-400 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="card-border p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-2">Annual Quota (2025)</h2>
              <p className="text-2xl font-bold text-purple-300">₹10,00,000</p>
              <p className="text-white/60 text-sm">Remaining: ₹10,00,000</p>
              <div className="mt-2 bg-gray-200/20 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Folder className="text-teal-400" size={20} />
                <div>
                  <h3 className="text-sm font-semibold text-white">Total Claims</h3>
                  <p className="text-lg font-bold text-teal-400">0</p>
                </div>
              </div>
            </div>
            <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="text-purple-400" size={20} />
                <div>
                  <h3 className="text-sm font-semibold text-white">Medical Claims</h3>
                  <p className="text-lg font-bold text-purple-400">0</p>
                </div>
              </div>
            </div>
            <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-pink-400" size={20} />
                <div>
                  <h3 className="text-sm font-semibold text-white">Pension Claims</h3>
                  <p className="text-lg font-bold text-pink-400">{selectedUser.type === 'Pensioner' ? '0' : 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-400" size={20} />
                <div>
                  <h3 className="text-sm font-semibold text-white">Avg Claim Amount</h3>
                  <p className="text-lg font-bold text-blue-400">₹0</p>
                </div>
              </div>
            </div>
          </section>

          {/* Claims History Table */}
          <section className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <h2 className="text-xl font-semibold text-white">Claims History</h2>
              <div className="flex gap-2">
                <Button
                  variant="success"
                  className="pulse flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => navigate('/claims/new')}
                >
                  <Plus size={16} />
                  <span>New Claim</span>
                </Button>
              </div>
            </div>
            
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
                  {filteredClaims.length ? (
                    filteredClaims.map((claim) => (
                      <tr key={claim.srNo} className="hover:bg-white/5 transition-colors">
                        <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.srNo}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-white/80 font-medium">{claim.claimCount}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.patient}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.hospital}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-green-400 font-semibold">{claim.claimAmount}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            claim.status === 'Approved' 
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <Button 
                            variant="primary" 
                            className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            View
                          </Button>
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
          </section>

          {/* Action Buttons */}
          <section className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="secondary"
              className="pulse flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
            <Button
              variant="primary"
              className="pulse flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => alert('Generate report functionality to be implemented.')}
            >
              <FileText size={16} />
              <span>Generate Report</span>
            </Button>
            {isAdmin && (
              <Button
                variant="secondary"
                className="pulse px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => navigate('/admin')}
              >
                Manage Users
              </Button>
            )}
          </section>
        </div>
      )}
    </div>
  );
};