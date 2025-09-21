
import React, { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { EnvelopeIcon, ShieldCheckIcon, KeyIcon } from './Icons';
import { PasswordStrengthIndicator } from './common/PasswordStrengthIndicator';
import { Loader } from './common/Loader';

interface ForgotPasswordProps {
  setAuthPage: (page: 'login' | 'signup' | 'forgotPassword') => void;
}

type Step = 'email' | 'otp' | 'reset';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setAuthPage }) => {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(`Sending OTP to ${email}`);
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(`Verifying OTP ${otp}`);
        setTimeout(() => {
            setIsLoading(false);
            if(otp === '123456') { // Mock OTP
                setStep('reset');
                setError('');
            } else {
                setError('Invalid verification code. Please try again.');
            }
        }, 1500);
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setIsLoading(true);
        console.log(`Resetting password for ${email}`);
        setTimeout(() => {
            setIsLoading(false);
            alert('Password has been reset successfully!');
            setAuthPage('login');
        }, 1500);
    };

    const renderContent = () => {
        switch(step) {
            case 'email':
                return (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-accent-primary">Forgot Password</h1>
                            <p className="text-text-secondary mt-2">Enter your email to get a verification code.</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSendCode}>
                            <Input 
                                label="Email Address"
                                id="reset-email"
                                type="email"
                                placeholder="you@example.com"
                                icon={<EnvelopeIcon />}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
                                {isLoading ? <Loader /> : 'Send Code'}
                            </Button>
                        </form>
                    </>
                );
            case 'otp':
                return (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-accent-primary">Enter Code</h1>
                            <p className="text-text-secondary mt-2">A 6-digit code was sent to <br/><strong>{email}</strong>.</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleVerifyOtp}>
                            <Input 
                                label="Verification Code"
                                id="reset-otp"
                                type="text"
                                placeholder="123456"
                                icon={<ShieldCheckIcon />}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                            <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
                                {isLoading ? <Loader /> : 'Verify'}
                            </Button>
                        </form>
                    </>
                );
            case 'reset':
                return (
                     <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-accent-primary">Set New Password</h1>
                            <p className="text-text-secondary mt-2">Create a new, strong password for your account.</p>
                        </div>
                        <form className="space-y-4" onSubmit={handleResetPassword}>
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
                            <div className="pt-2">
                                <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
                                    {isLoading ? <Loader /> : 'Update Password'}
                                </Button>
                            </div>
                        </form>
                    </>
                );
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
                   {renderContent()}
                </div>
                 <p className="text-center mt-6 text-text-secondary">
                    Remember your password?{' '}
                    <button onClick={() => setAuthPage('login')} className="font-semibold text-accent-primary hover:underline">
                        Back to Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;