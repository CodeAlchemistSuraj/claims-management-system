import React from 'react';
import { Folder, Clock, Check } from 'lucide-react';

export const StatsCard = ({ title, value, icon, color }) => {
  const IconMap = {
    folder: Folder,
    clock: Clock,
    check: Check,
  };
  const Icon = IconMap[icon];
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${colors[color]} animate-scale-in`}>
      <div className="flex items-center space-x-4">
        {Icon && <Icon size={32} />}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};