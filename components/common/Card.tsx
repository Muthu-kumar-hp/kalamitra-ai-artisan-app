import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-bg-primary p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};