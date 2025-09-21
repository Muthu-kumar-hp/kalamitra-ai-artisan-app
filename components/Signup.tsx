

import React, { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Textarea } from './common/Textarea';
import { UserCircleIcon, EnvelopeIcon, LockClosedIcon, DevicePhoneMobileIcon, CameraIcon } from './Icons';
import { PasswordStrengthIndicator } from './common/PasswordStrengthIndicator';

interface SignupProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthPage: (page: 'login' | 'signup' | 'forgotPassword') => void;
}

const Signup: React.FC<SignupProps> = ({ setIsAuthenticated, setAuthPage }) => {
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-accent-primary">Create an Account</h1>
                        <p className="text-text-secondary mt-2">Join Artisan AI and empower your craft.</p>
                    </div>

                     <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                               <CameraIcon className="w-8 h-8 text-gray-400"/>
                            </div>
                        </div>

                        <Input label="Full Name" id="signup-name" type="text" placeholder="Your Name" icon={<UserCircleIcon />} required />
                        <Input label="Email Address" id="signup-email" type="email" placeholder="you@example.com" icon={<EnvelopeIcon />} required />
                        <Input label="Phone Number" id="signup-phone" type="tel" placeholder="+1 (555) 123-4567" icon={<DevicePhoneMobileIcon />} />
                        
                        <div>
                            <Input 
                                label="Password" 
                                id="signup-password" 
                                type="password" 
                                placeholder="••••••••" 
                                icon={<LockClosedIcon />} 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required 
                            />
                            <PasswordStrengthIndicator password={password} />
                        </div>
                        
                        <Input label="Confirm Password" id="signup-confirm-password" type="password" placeholder="••••••••" icon={<LockClosedIcon />} required />
                        
                        <Textarea label="Bio / Short Description" placeholder="Tell us about your craft..." rows={2} />

                        <div className="pt-4">
                            <Button type="submit" className="w-full text-lg py-3">
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
                <p className="text-center mt-6 text-text-secondary">
                    Already have an account?{' '}
                    <button onClick={() => setAuthPage('login')} className="font-semibold text-accent-primary hover:underline">
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;