import React, { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { KeyIcon, LockClosedIcon } from './Icons';
import { PasswordStrengthIndicator } from './common/PasswordStrengthIndicator';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }
        
        // Simulate API call
        console.log('Password change submitted');
        alert('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-bg-primary dark:bg-gray-800 ethnic:bg-ethnic-bg craftsman:bg-craftsman-bg handloom:bg-handloom-bg terracotta:bg-terracotta-bg tribal:bg-tribal-bg madhubani:bg-madhubani-bg w-full max-w-md p-6 rounded-2xl shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4 text-center text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        label="Current Password"
                        id="current-password"
                        type="password"
                        icon={<LockClosedIcon />}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        required
                    />
                    <div>
                        <Input 
                            label="New Password"
                            id="new-password"
                            type="password"
                            icon={<KeyIcon />}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                        <PasswordStrengthIndicator password={newPassword} />
                    </div>
                    <Input 
                        label="Confirm New Password"
                        id="confirm-new-password"
                        type="password"
                        icon={<KeyIcon />}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    
                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Update Password</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
