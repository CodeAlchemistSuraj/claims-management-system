// src/pages/AdminPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { CreateUserForm } from '../components/admin/CreateUserForm';
import { UsersTable } from '../components/admin/UsersTable';
import { 
  Users, 
  Shield, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export const AdminPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch all data on component mount
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all users
      const usersResponse = await fetch('http://localhost:8080/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!usersResponse.ok) throw new Error('Failed to fetch users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch all claims for admin
      const claimsResponse = await fetch('http://localhost:8080/api/claims', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (claimsResponse.ok) {
        const claimsData = await claimsResponse.json();
        setClaims(claimsData);
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError(`Failed to load admin data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter claims by status
  const filteredClaims = useMemo(() => {
    return claims.filter(claim => {
      const matchesSearch = searchQuery === '' || 
        claim.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.diseaseName?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || claim.status === statusFilter.toUpperCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [claims, searchQuery, statusFilter]);

  // Calculate admin statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isAlive !== false).length;
    const totalClaims = claims.length;
    const pendingClaims = claims.filter(c => c.status === 'PENDING').length;
    const approvedClaims = claims.filter(c => c.status === 'APPROVED').length;
    const rejectedClaims = claims.filter(c => c.status === 'REJECTED').length;
    const totalClaimAmount = claims.reduce((sum, claim) => sum + (claim.payableAmount || 0), 0);

    return {
      totalUsers,
      activeUsers,
      totalClaims,
      pendingClaims,
      approvedClaims,
      rejectedClaims,
      totalClaimAmount
    };
  }, [users, claims]);

  // Handle claim status update
  const handleClaimStatusUpdate = async (claimId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/claims/${claimId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh claims data
        fetchAdminData();
      } else {
        throw new Error('Failed to update claim status');
      }
    } catch (error) {
      console.error('Error updating claim status:', error);
      setError('Failed to update claim status');
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-white text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-red-400 text-lg">{error}</div>
        <Button onClick={fetchAdminData} className="ml-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="w-full animate-scale-in">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Admin Management System
        </h1>
        <p className="text-lg text-white/80">
          Comprehensive User Management and Claims Administration
        </p>
      </div>

      {/* Admin Stats Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-border p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <Users className="text-blue-400" size={24} />
            <div>
              <h3 className="text-sm font-semibold text-white/80">Total Users</h3>
              <p className="text-2xl font-bold text-blue-400">{stats.totalUsers}</p>
              <p className="text-white/60 text-xs">Active: {stats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="card-border p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <FileText className="text-purple-400" size={24} />
            <div>
              <h3 className="text-sm font-semibold text-white/80">Total Claims</h3>
              <p className="text-2xl font-bold text-purple-400">{stats.totalClaims}</p>
              <p className="text-white/60 text-xs">₹{stats.totalClaimAmount.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="card-border p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={24} />
            <div>
              <h3 className="text-sm font-semibold text-white/80">Approved</h3>
              <p className="text-2xl font-bold text-green-400">{stats.approvedClaims}</p>
              <p className="text-white/60 text-xs">{((stats.approvedClaims/stats.totalClaims)*100 || 0).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="card-border p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <Clock className="text-amber-400" size={24} />
            <div>
              <h3 className="text-sm font-semibold text-white/80">Pending</h3>
              <p className="text-2xl font-bold text-amber-400">{stats.pendingClaims}</p>
              <p className="text-white/60 text-xs">Needs review</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button
            variant="primary"
            className="pulse flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </Button>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => alert('Export functionality to be implemented')}
          >
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="mb-6">
        <div className="flex border-b border-white/20">
          <button
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
              activeTab === 'users' 
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} />
            User Management
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
              activeTab === 'claims' 
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => setActiveTab('claims')}
          >
            <FileText size={18} />
            Claims Review ({stats.pendingClaims})
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
              activeTab === 'analytics' 
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={18} />
            Analytics
          </button>
        </div>
      </section>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="card-border p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Plus size={20} />
                Create New User
              </h2>
              <CreateUserForm onUserCreated={fetchAdminData} />
            </div>

            <div className="card-border p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users size={20} />
                User Management ({users.length} users)
              </h2>
              <UsersTable users={users} onUserUpdated={fetchAdminData} />
            </div>
          </div>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <div className="card-border p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FileText size={20} />
                Claims Review Panel
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-white/50" size={18} />
                  <input
                    type="text"
                    placeholder="Search claims..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg">
              <table className="w-full min-w-full divide-y divide-white/10">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Claim ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Hospital</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/80 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-black/10">
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-white/80 font-mono">CLM{claim.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">{claim.patientName || 'Self'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">{claim.hospitalName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-green-400 font-semibold">
                          ₹{(claim.payableAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            claim.status === 'APPROVED' 
                              ? 'bg-green-500/20 text-green-300'
                              : claim.status === 'REJECTED'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {claim.status || 'PENDING'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex gap-2">
                            {claim.status === 'PENDING' && (
                              <>
                                <Button
                                  variant="success"
                                  className="text-xs px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-300"
                                  onClick={() => handleClaimStatusUpdate(claim.id, 'APPROVED')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="danger"
                                  className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300"
                                  onClick={() => handleClaimStatusUpdate(claim.id, 'REJECTED')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button
                              variant="primary"
                              className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              onClick={() => navigate(`/claims/${claim.id}`)}
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-white/60">
                        No claims found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-border p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Claims Distribution</h3>
              <div className="space-y-3">
                {['PENDING', 'APPROVED', 'REJECTED'].map(status => {
                  const count = claims.filter(c => c.status === status).length;
                  const percentage = (count / claims.length) * 100;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-white/80 text-sm capitalize">{status.toLowerCase()}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              status === 'APPROVED' ? 'bg-green-500' :
                              status === 'REJECTED' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-12">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-border p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full justify-start gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30"
                  onClick={() => setActiveTab('claims')}
                >
                  <AlertCircle size={18} />
                  Review Pending Claims ({stats.pendingClaims})
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start gap-3 bg-blue-500/20 hover:bg-blue-500/30"
                  onClick={() => alert('Generate report functionality')}
                >
                  <Download size={18} />
                  Generate Monthly Report
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start gap-3 bg-green-500/20 hover:bg-green-500/30"
                  onClick={() => setActiveTab('users')}
                >
                  <Users size={18} />
                  Manage User Accounts
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};