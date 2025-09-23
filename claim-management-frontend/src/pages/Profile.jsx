import React from 'react';
import { User, FileText } from 'lucide-react';

export const Profile = ({ user, isAdmin = false }) => {
  return (
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
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">ID:</span>
              <span className="text-white font-medium">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Type:</span>
              <span className="text-white font-medium">{user?.type}</span>
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
              <span className="text-white font-medium">{user?.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Status:</span>
              <span className="text-green-400 font-medium">Active</span>
            </div>
            {isAdmin && (
              <div className="flex justify-between">
                <span className="text-white/60">Managed by Admin:</span>
                <span className="text-yellow-400 font-medium">Yes</span>
              </div>
            )}
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
              <p className="text-lg font-bold text-pink-400">{user?.type === 'Pensioner' ? '0' : 'N/A'}</p>
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
    </div>
  );
};