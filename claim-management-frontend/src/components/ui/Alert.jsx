import React from 'react';

export const Alert = ({ message, type, className }) => (
  <div className={className}>{message}</div>
);