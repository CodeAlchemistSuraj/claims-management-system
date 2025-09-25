// src/components/ui/FormField.jsx (Enhanced version)
import React from 'react';

export const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  icon,
  options = [], // For select inputs
  className = '' 
}) => {
  const renderInput = () => {
    if (type === 'select') {
      return (
        <select
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors ${
            icon ? 'pl-10' : ''
          }`}
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors resize-vertical ${
            icon ? 'pl-10' : ''
          }`}
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors ${
          icon ? 'pl-10' : ''
        }`}
      />
    );
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-white/80 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-white/50">
            {icon}
          </div>
        )}
        {renderInput()}
      </div>
    </div>
  );
};