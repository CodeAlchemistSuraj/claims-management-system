import React from 'react';

export const Button = ({ children, variant, type, loading, className, onClick }) => (
  <button
    type={type}
    disabled={loading}
    className={`${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    onClick={onClick} // ← This was missing!
  >
    {children}
  </button>
);