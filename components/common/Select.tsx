import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-bg-secondary border-border-color text-text-primary focus:ring-accent-primary focus:border-accent-primary ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};