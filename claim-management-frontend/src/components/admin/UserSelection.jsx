import React from 'react';
import { Users, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const UserSelection = ({ users, searchTerm, onSearchChange, onUserSelect, selectedUser }) => {
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-6">
      <div className="card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="text-purple-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Search Employees</h3>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, ID, or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
          />
          <Search className="absolute right-3 top-3 text-white/50" size={20} />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Users size={20} />
        Select User Profile to Manage
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`card-border p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedUser?.id === user.id ? 'ring-2 ring-purple-400' : ''
            }`}
            onClick={() => onUserSelect(user)}
          >
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
              user.type === 'Active Employee' ? 'bg-teal-500/20 text-teal-300' : 'bg-purple-500/20 text-purple-300'
            }`}>
              {user.type}
            </span>
            <h3 className="text-lg font-bold text-white mb-1">{user.name}</h3>
            <p className="text-white/60 text-sm">ID: {user.id}</p>
            <p className="text-white/50 text-xs mt-1">Dept: {user.department}</p>
            <Button
              variant="primary"
              className="w-full mt-3 text-sm pulse bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={(e) => {
                e.stopPropagation();
                onUserSelect(user);
              }}
            >
              {selectedUser?.id === user.id ? 'Selected' : 'Manage Profile'}
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
  );
};