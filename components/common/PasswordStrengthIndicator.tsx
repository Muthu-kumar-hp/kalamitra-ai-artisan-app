import React from 'react';

interface PasswordStrengthIndicatorProps {
    password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
    const getStrength = () => {
        if (password.length < 6) return 0;
        if (password.length < 8) return 1;
        if (password.length < 12) return 2;
        return 3;
    };
    const strength = getStrength();
    const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    
    return (
        <div className="flex items-center gap-2 mt-1">
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-600">
                <div 
                    className={`h-1.5 rounded-full ${strengthColors[strength]} transition-all duration-300`} 
                    style={{ width: `${((strength + 1) / 4) * 100}%` }}
                />
            </div>
            <span className="text-xs text-text-secondary dark:text-gray-400 w-12 text-right">{strengthLabels[strength]}</span>
        </div>
    );
};
