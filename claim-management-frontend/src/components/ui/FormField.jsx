import React from 'react';

export const FormField = ({ label, id, type = 'text', value, onChange, required, className, placeholder }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-white">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
      placeholder={placeholder}
    />
  </div>
);