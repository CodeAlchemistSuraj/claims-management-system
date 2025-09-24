import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Plus, FileText, User, Folder, Clock, CheckCircle, Search, LogOut } from 'lucide-react';

export const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  
  // Fix role checking - your JWT contains 'ADMIN' not 'ROLE_ADMIN'
  const isAdmin = useMemo(() => user?.role === 'ADMIN', [user?.role]);
  
  // Only log in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    useEffect(() => {
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        console.log('JWT Decoded payload:', decoded);
        console.log('Is admin?:', isAdmin);
      }
    }, [token, isAdmin]);
  }

  const [users, setUsers] = useState([]);
  const [claims, setClaims] = useState([]);
  const [quotas, setQuotas] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchClaim, setSearchClaim] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const profileSectionRef = useRef(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // DEBUG: Check what's in the decoded JWT (development only)
  useEffect(() => {
    if (isDevelopment && token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT Decoded payload:', decoded);
      console.log('JWT Available keys:', Object.keys(decoded));
      console.log('User object:', user);
      console.log('User role:', user?.role);
      console.log('Is admin?:', user?.role === 'ADMIN');
      console.log('Is ROLE_ADMIN?:', user?.role === 'ROLE_ADMIN');
    }
  }, [token, isDevelopment]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // FIXED: Validate user object exists and has ID
      if (!user || !user.sub) {
        setError('User information not available. Please login again.');
        setLoading(false);
        return;
      }

      if (isAdmin) {
        // Admin sees all users
        const usersResponse = await fetch('http://localhost:8080/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!usersResponse.ok) throw new Error('Failed to fetch users');
        const usersData = await usersResponse.json();
        
        const formattedUsers = usersData.map(user => ({
          id: user.sub,
          employee_code: user.employee_code || `EMP${user.sub}`,
          name: user.name,
          role: user.role || 'ROLE_USER',
          type: user.type === 'pensioner' ? 'Pensioner' : 'Active Employee',
          department: user.department || (user.type === 'pensioner' ? 'Retired' : 'IT'),
          dob: user.dob,
          spouse_name: user.spouseName,
          start_date: user.startDate,
          lifetime_used: user.lifetimeUsed || 0,
          annual_used: user.annualUsed || 0,
          username: user.sub
        }));
        setUsers(formattedUsers);
        
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
      } else {
        // Regular user sees only their data
        const currentUser = {
          id: user.sub,
          employee_code: user.employee_code || `EMP${user.sub}`,
          name: user.name || user.sub || 'Unknown User',
          role: user.role || 'ROLE_USER',
          type: user.type === 'pensioner' ? 'Pensioner' : 'Active Employee',
          department: user.department || 'Not Specified',
          dob: user.dob,
          spouse_name: user.spouse_name,
          start_date: user.start_date,
          lifetime_used: user.lifetime_used || 0,
          annual_used: user.annual_used || 0,
          username: user.sub || user.sub.toString()
        };
        setUsers([currentUser]);
        setSelectedUser(currentUser);
        
        // Fetch user claims
        const claimsResponse = await fetch(`http://localhost:8080/api/claims/user/${user.sub}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (claimsResponse.ok) {
          const claimsData = await claimsResponse.json();
          setClaims(claimsData);
        }
        
        // Fetch quotas
        const quotasResponse = await fetch(`http://localhost:8080/api/claims/quotas/${user.sub}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (quotasResponse.ok) {
          const quotasData = await quotasResponse.json();
          setQuotas(quotasData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to profile section when a user is selected
  useEffect(() => {
    if (selectedUser && profileSectionRef.current) {
      setTimeout(() => {
        profileSectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }, 100);
    }
  }, [selectedUser]);

  const handleUserSelect = async (selectedUser) => {
    setSelectedUser(selectedUser);
    
    try {
      const claimsResponse = await fetch(`http://localhost:8080/api/claims/user/${selectedUser.sub}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (claimsResponse.ok) {
        const claimsData = await claimsResponse.json();
        setClaims(claimsData);
      }
      
      const quotasResponse = await fetch(`http://localhost:8080/api/claims/quotas/${selectedUser.sub}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (quotasResponse.ok) {
        const quotasData = await quotasResponse.json();
        setQuotas(quotasData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data.');
    }
  };

  // Format claim data for UI display
  const formatClaimForUI = (claim) => ({
    id: claim.id,
    srNo: claim.srNo || claim.id,
    claimCount: claim.claimCount?.toString() || `CLM${claim.id}`,
    year: claim.year || new Date().getFullYear(),
    patient: claim.patientName || 'Self',
    hospital: claim.hospitalName || 'Unknown Hospital',
    coverage: claim.coveredIn || 'CGHS',
    disease: claim.diseaseName || 'General Treatment',
    admission: claim.dateOfAdmission || '2025-01-01',
    discharge: claim.dateOfDischarge || '2025-01-01',
    days: claim.numberOfDaysStay || 1,
    claimAmount: `₹${(claim.claimAmount || 0).toLocaleString('en-IN')}`,
    roomRent: `₹${(claim.roomRentAmount || 0).toLocaleString('en-IN')}`,
    nonPayable: `₹${(claim.nonPayableAmount || 0).toLocaleString('en-IN')}`,
    payable: `₹${(claim.payableAmount || 0).toLocaleString('en-IN')}`,
    status: claim.status === 'APPROVED' ? 'Approved' : 
            claim.status === 'REJECTED' ? 'Rejected' : 'Pending'
  });

  // Use useMemo for optimized filtering
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (!user) return false;
      
      const searchText = [
        user.name || '',
        user.employee_code || '',
        user.department || ''
      ].join(' ').toLowerCase();
      
      return searchText.includes(searchEmployee.toLowerCase());
    });
  }, [users, searchEmployee]);

  const filteredClaims = useMemo(() => {
    return claims
      .map(formatClaimForUI)
      .filter(claim => {
        if (!claim) return false;
        
        const searchText = [
          claim.claimCount || '',
          claim.patient || '',
          claim.hospital || '',
          claim.disease || ''
        ].join(' ').toLowerCase();
        
        return searchText.includes(searchClaim.toLowerCase());
      });
  }, [claims, searchClaim]);

  // Calculate stats from real data
  const totalClaims = claims.length;
  const medicalClaims = claims.filter(claim => 
    claim.patientName && claim.patientName.toLowerCase().includes('self')
  ).length;
  const pensionClaims = selectedUser?.type === 'Pensioner' ? 
    claims.filter(claim => claim.patientName && claim.patientName.toLowerCase().includes('spouse')).length : 0;
  const avgClaimAmount = claims.length > 0 ? 
    claims.reduce((sum, claim) => sum + (claim.payableAmount || 0), 0) / claims.length : 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-white text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-red-400 text-lg">{error}</div>
        <Button onClick={fetchData} className="ml-4">Retry</Button>
      </div>
    );
  }

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

      {/* User Selection Grid (Only for Admin) */}
      {isAdmin && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Select User Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl pulse border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => handleUserSelect(u)}
              >
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                  u.type === 'Active Employee' ? 'bg-teal-500/20 text-teal-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {u.type}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{u.name}</h3>
                <p className="text-white/60 text-sm">ID: {u.employee_code}</p>
                <p className="text-white/50 text-xs mt-1">Dept: {u.department}</p>
                <Button
                  variant="primary"
                  className="w-full mt-3 text-sm pulse bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserSelect(u);
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
      )}

      {/* Profile Section with ref for auto-scroll */}
      <div ref={profileSectionRef}>
        {(selectedUser || !isAdmin) && (
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
                    <span className="text-white font-medium">{selectedUser?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Employee Code:</span>
                    <span className="text-white font-medium">{selectedUser?.employee_code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Type:</span>
                    <span className="text-white font-medium">{selectedUser?.type}</span>
                  </div>
                  {selectedUser?.dob && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Date of Birth:</span>
                      <span className="text-white font-medium">{new Date(selectedUser.dob).toLocaleDateString()}</span>
                    </div>
                  )}
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
                    <span className="text-white font-medium">{selectedUser?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Status:</span>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                  {selectedUser?.start_date && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Start Date:</span>
                      <span className="text-white font-medium">{new Date(selectedUser.start_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Quota Section with Real Data */}
            {quotas ? (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card-border p-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-2">Lifetime Quota</h2>
                  <p className="text-2xl font-bold text-teal-300">₹{quotas.lifetimeQuota?.toLocaleString('en-IN') || '50,00,000'}</p>
                  <p className="text-white/60 text-sm">Remaining: ₹{quotas.lifetimeRemaining?.toLocaleString('en-IN') || '50,00,000'}</p>
                  <div className="mt-2 bg-gray-200/20 rounded-full h-2">
                    <div 
                      className="bg-teal-400 h-2 rounded-full" 
                      style={{ width: `${((quotas.lifetimeUsed || 0) / (quotas.lifetimeQuota || 5000000)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="card-border p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-2">Annual Quota (2025)</h2>
                  <p className="text-2xl font-bold text-purple-300">₹{quotas.annualQuota?.toLocaleString('en-IN') || '10,00,000'}</p>
                  <p className="text-white/60 text-sm">Remaining: ₹{quotas.yearRemaining?.toLocaleString('en-IN') || '10,00,000'}</p>
                  <div className="mt-2 bg-gray-200/20 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full" 
                      style={{ width: `${((quotas.yearUsed || 0) / (quotas.annualQuota || 1000000)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </section>
            ) : (
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
            )}

            {/* Stats Cards with Real Data */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Folder className="text-teal-400" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Total Claims</h3>
                    <p className="text-lg font-bold text-teal-400">{totalClaims}</p>
                  </div>
                </div>
              </div>
              <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="text-purple-400" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Medical Claims</h3>
                    <p className="text-lg font-bold text-purple-400">{medicalClaims}</p>
                  </div>
                </div>
              </div>
              <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-pink-400" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Pension Claims</h3>
                    <p className="text-lg font-bold text-pink-400">{selectedUser?.type === 'Pensioner' ? pensionClaims : 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="card-border p-3 bg-black/20 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-400" size={20} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Avg Claim Amount</h3>
                    <p className="text-lg font-bold text-blue-400">₹{avgClaimAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
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
                        <tr key={claim.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.srNo}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-white/80 font-medium">{claim.claimCount}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.patient}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-white/80">{claim.hospital}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-green-400 font-semibold">{claim.claimAmount}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              claim.status === 'Approved' 
                                ? 'bg-green-500/20 text-green-300'
                                : claim.status === 'Rejected'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {claim.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <Button 
                              variant="primary" 
                              className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              onClick={() => navigate(`/claims/${claim.id}`)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-3 py-4 text-center text-white/60">
                          {claims.length === 0 ? 'No claims found.' : 'No claims found matching your search.'}
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
    </div>
  );
};