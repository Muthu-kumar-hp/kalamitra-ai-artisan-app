
import React, { useState } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, GoogleIcon, FacebookIcon } from './Icons';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthPage: (page: 'login' | 'signup' | 'forgotPassword') => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setAuthPage }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in-up">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-accent-primary">Artisan AI</h1>
                        <p className="text-text-secondary mt-2">Welcome back! Please login to your account.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
                        <Input 
                            label="Email / Phone Number"
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            icon={<EnvelopeIcon />}
                            required
                        />
                        
                        <div className="relative">
                            <Input
                                label="Password"
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                icon={<LockClosedIcon />}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="text-right">
                            <button 
                                type="button" 
                                onClick={() => setAuthPage('forgotPassword')} 
                                className="text-sm font-medium text-accent-primary hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        
                        <Button type="submit" className="w-full text-lg py-3">
                            Login
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-color" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-text-secondary">Or continue with</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-center gap-6">
                        <button className="flex flex-col items-center justify-center w-28 h-28 bg-bg-secondary text-text-primary hover:bg-border-color focus:ring-gray-400 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200">
                            <GoogleIcon className="w-8 h-8"/>
                            <span className="mt-1 text-sm font-semibold">Google</span>
                        </button>
                         <button className="flex flex-col items-center justify-center w-28 h-28 bg-bg-secondary text-text-primary hover:bg-border-color focus:ring-gray-400 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200">
                            <FacebookIcon className="w-8 h-8"/>
                            <span className="mt-1 text-sm font-semibold">Facebook</span>
                        </button>
                    </div>

                </div>
                <p className="text-center mt-6 text-text-secondary">
                    Don’t have an account?{' '}
                    <button onClick={() => setAuthPage('signup')} className="font-semibold text-accent-primary hover:underline">
                        Create Account
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
