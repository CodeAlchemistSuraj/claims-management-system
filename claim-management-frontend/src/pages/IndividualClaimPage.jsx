import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  User, 
  Building, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Upload,
  Eye,
  Edit
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Enhanced Summary Card Component
// Fix SummaryCard - change 'icon: Icon' to just 'icon'
const SummaryCard = ({ icon, title, value, subtitle, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
    indigo: 'bg-indigo-500/20 text-indigo-400',
    red: 'bg-red-500/20 text-red-400',
    teal: 'bg-teal-500/20 text-teal-400'
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/10">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-white/70 text-sm font-medium mb-1">{title}</p>
          <p className="text-white font-semibold text-lg mb-1">{value}</p>
          <p className="text-white/50 text-xs">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// Fix ActionButton - change 'icon: Icon' to just 'icon'
const ActionButton = ({ icon, label, description, variant = 'secondary', onClick }) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white',
    secondary: 'bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border border-white/10'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${variantClasses[variant]} hover:scale-105`}
    >
      <div className={`p-2 rounded-lg ${variant === 'primary' ? 'bg-white/20' : 'bg-white/10'}`}>
        {icon}
      </div>
      <div className="text-left flex-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs opacity-70">{description}</p>
      </div>
    </button>
  );
};

export const IndividualClaimPage = () => {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchClaim = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setClaim({
          id: claimId,
          claimNumber: `CLM-${claimId}-2024`,
          type: 'MEDICAL',
          status: 'UNDER_REVIEW',
          submittedDate: '2024-01-15',
          amount: 12500.00,
          approvedAmount: 0,
          patientName: 'John Doe',
          patientAge: 45,
          hospital: 'City General Hospital',
          hospitalAddress: '123 Medical Center, Healthcare City',
          treatingDoctor: 'Dr. Sarah Smith',
          disease: 'Hypertension with complications',
          diseaseCode: 'I10',
          treatmentPeriod: '2024-01-10 to 2024-01-14',
          documents: [
            { id: 1, name: 'Medical_Bill_1.pdf', type: 'BILL', uploadedDate: '2024-01-15', size: '2.4 MB' },
            { id: 2, name: 'Doctor_Prescription.pdf', type: 'PRESCRIPTION', uploadedDate: '2024-01-15', size: '1.1 MB' },
            { id: 3, name: 'Lab_Reports.pdf', type: 'LAB_REPORT', uploadedDate: '2024-01-16', size: '3.2 MB' }
          ],
          approvalHistory: [
            { step: 'Submitted', date: '2024-01-15', status: 'COMPLETED', officer: 'System' },
            { step: 'Initial Review', date: '2024-01-16', status: 'COMPLETED', officer: 'Officer A' },
            { step: 'Medical Assessment', date: '2024-01-17', status: 'IN_PROGRESS', officer: 'Dr. Expert' },
            { step: 'Final Approval', date: '', status: 'PENDING', officer: '' }
          ],
          pendencyReasons: [
            { reason: 'Additional lab reports required', requestedDate: '2024-01-17', dueDate: '2024-01-24' }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchClaim();
  }, [claimId]);

  const TabButton = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
        activeTab === tab
          ? 'bg-white/20 text-white shadow-lg'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-400" />
          <h2 className="mt-4 text-2xl font-bold text-white">Claim Not Found</h2>
          <Button onClick={() => navigate('/claims')} className="mt-4">
            Back to Claims
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/claims')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Claims
            </Button>
            <StatusBadge status={claim.status} />
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {claim.claimNumber}
              </h1>
              <p className="text-white/80 flex items-center gap-2">
                <FileText size={16} />
                {claim.type === 'MEDICAL' ? 'Medical Claim' : 'Pension Claim'}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="secondary" className="flex items-center gap-2">
                <Eye size={16} />
                View PDF
              </Button>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Edit size={16} />
                Edit Claim
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto">
          <TabButton tab="overview" icon={FileText} label="Overview" />
          <TabButton tab="documents" icon={Upload} label="Documents" />
          <TabButton tab="approval" icon={CheckCircle} label="Approval Flow" />
          <TabButton tab="pendency" icon={Clock} label="Pendency" />
          {claim.type === 'MEDICAL' && (
            <TabButton tab="medical" icon={User} label="Medical Details" />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Claim Summary Card */}
            <div className="lg:col-span-2">
              <div className="card-overlay backdrop-blur-lg rounded-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <FileText className="text-teal-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Claim Summary</h3>
                      <p className="text-white/60 text-sm">Complete claim overview and financial details</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<SummaryCard 
  icon={<DollarSign size={20} />}
  title="Claim Amount" 
  value={`₹${claim.amount.toLocaleString()}`}
  subtitle="Total claimed amount"
  color="green"
/>
<SummaryCard 
  icon={<CheckCircle size={20} />}
  title="Approved Amount" 
  value={claim.approvedAmount ? `₹${claim.approvedAmount.toLocaleString()}` : 'Pending'}
  subtitle="Approved by insurance"
  color="blue"
/>
<SummaryCard 
  icon={<Calendar size={20} />}
  title="Submitted Date" 
  value={new Date(claim.submittedDate).toLocaleDateString()}
  subtitle="Date of submission"
  color="purple"
/>
<SummaryCard 
  icon={<User size={20} />}
  title="Patient" 
  value={claim.patientName}
  subtitle="Claim beneficiary"
  color="orange"
/>
{claim.type === 'MEDICAL' && (
  <SummaryCard 
    icon={<Clock size={20} />}
    title="Treatment Period" 
    value={claim.treatmentPeriod}
    subtitle="Hospital stay duration"
    color="indigo"
  />
)}
<SummaryCard 
  icon={<Building size={20} />}
  title="Hospital" 
  value={claim.hospital}
  subtitle="Treatment facility"
  color="red"
/>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="card-overlay backdrop-blur-lg rounded-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Edit className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Quick Actions</h3>
                      <p className="text-white/60 text-sm">Manage your claim efficiently</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
 <ActionButton 
  icon={<Upload size={18} />}
  label="Upload Documents"
  description="Add medical bills, reports"
  variant="primary"
  onClick={() => console.log('Upload clicked')}
/>
<ActionButton 
  icon={<Download size={18} />}
  label="Download Package"
  description="Complete claim documents"
  variant="secondary"
  onClick={() => console.log('Download clicked')}
/>
<ActionButton 
  icon={<Edit size={18} />}
  label="Update Information"
  description="Modify claim details"
  variant="secondary"
  onClick={() => console.log('Update clicked')}
/>
<ActionButton 
  icon={<Eye size={18} />}
  label="View PDF Report"
  description="Detailed claim report"
  variant="secondary"
  onClick={() => console.log('View PDF clicked')}
/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain the same */}
        {activeTab === 'documents' && (
          <div className="card-overlay backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Uploaded Documents</h3>
            <div className="space-y-3">
              {claim.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="text-primary" size={20} />
                    <div>
                      <p className="text-white font-medium">{doc.name}</p>
                      <p className="text-white/60 text-sm">
                        {doc.type} • {doc.uploadedDate} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex items-center gap-1">
                      <Eye size={14} />
                      View
                    </Button>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 flex items-center gap-2">
              <Upload size={16} />
              Upload New Document
            </Button>
          </div>
        )}

        {activeTab === 'approval' && (
          <div className="card-overlay backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Approval Process</h3>
            <div className="space-y-4">
              {claim.approvalHistory.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.status === 'COMPLETED' ? <CheckCircle className="text-green-400" size={20} /> :
                     step.status === 'IN_PROGRESS' ? <Clock className="text-yellow-400" size={20} /> :
                     <AlertCircle className="text-gray-400" size={20} />}
                    {index !== claim.approvalHistory.length - 1 && <div className="w-0.5 h-8 bg-white/20 mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{step.step}</span>
                      <span className="text-white/60 text-sm">{step.date || 'Pending'}</span>
                    </div>
                    <p className="text-white/60 text-sm">Officer: {step.officer || 'Not assigned'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pendency' && (
          <div className="card-overlay backdrop-blur-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Pending Items</h3>
            {claim.pendencyReasons.length > 0 ? (
              <div className="space-y-4">
                {claim.pendencyReasons.map((item, index) => (
                  <div key={index} className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-yellow-400" size={18} />
                      <span className="text-yellow-300 font-medium">Action Required</span>
                    </div>
                    <p className="text-white mb-2">{item.reason}</p>
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Requested: {item.requestedDate}</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">No pending items - claim is progressing smoothly</p>
            )}
          </div>
        )}

        {activeTab === 'medical' && claim.type === 'MEDICAL' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-overlay backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <User size={20} />
                Patient Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Full Name:</span>
                  <span className="text-white font-semibold">{claim.patientName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Age:</span>
                  <span className="text-white font-semibold">{claim.patientAge}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Disease:</span>
                  <span className="text-white font-semibold">{claim.disease}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70 font-medium">Disease Code:</span>
                  <span className="text-white font-semibold">{claim.diseaseCode}</span>
                </div>
              </div>
            </div>

            <div className="card-overlay backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Building size={20} />
                Hospital Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Hospital Name:</span>
                  <span className="text-white font-semibold">{claim.hospital}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Address:</span>
                  <span className="text-white font-semibold">{claim.hospitalAddress}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Treating Doctor:</span>
                  <span className="text-white font-semibold">{claim.treatingDoctor}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/70 font-medium">Treatment Period:</span>
                  <span className="text-white font-semibold">{claim.treatmentPeriod}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};