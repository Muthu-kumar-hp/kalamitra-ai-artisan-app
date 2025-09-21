import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-accent-primary ${sizeClasses[size]}`}
    ></div>
  );
};