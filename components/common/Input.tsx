

import React from 'react';

// Fix: The icon prop type is now more specific, indicating it's a React element
// that accepts a className. This is necessary for React.cloneElement to be type-safe.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactElement<{ className?: string }>;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', icon, ...props }) => {
  const inputId = id || `input-${Math.random()}`;
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="font-semibold block mb-2 text-text-primary dark:text-gray-200">{label}</label>}
      <div className="relative">
        {icon && React.isValidElement(icon) && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {React.cloneElement(icon, { className: 'w-5 h-5' })}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-bg-secondary border-border-color text-text-primary focus:ring-accent-primary focus:border-accent-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
