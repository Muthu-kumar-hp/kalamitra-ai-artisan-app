import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => {
  const textareaId = id || `textarea-${Math.random()}`;
  return (
    <div>
      {label && <label htmlFor={textareaId} className="font-semibold block mb-2 text-text-primary">{label}</label>}
      <textarea
        id={textareaId}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-bg-secondary border-border-color text-text-primary focus:ring-accent-primary focus:border-accent-primary ${className}`}
        {...props}
      />
    </div>
  );
};