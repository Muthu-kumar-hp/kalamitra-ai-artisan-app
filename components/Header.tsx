

import React, { useState, useEffect, useRef } from 'react';
import { BellIcon, UserCircleIcon, Bars3Icon, KeyIcon, ArrowRightOnRectangleIcon } from './Icons';
import { Page, Theme } from '../types';
import { VoiceAssistant } from './VoiceAssistant';
import ThemeChanger from './ThemeChanger';
import { PAGES } from '../constants';

interface HeaderProps {
    setActivePage: (page: Page) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    setSidebarOpen: (isOpen: boolean) => void;
    handleLogout: () => void;
    openChangePasswordModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ setActivePage, theme, setTheme, setSidebarOpen, handleLogout, openChangePasswordModal }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <header className="h-16 bg-bg-primary/80 dark:bg-gray-900/80 ethnic:bg-ethnic-bg/80 craftsman:bg-craftsman-bg/80 handloom:bg-handloom-bg/80 terracotta:bg-terracotta-bg/80 tribal:bg-tribal-bg/80 madhubani:bg-madhubani-bg/80 backdrop-blur-sm flex items-center justify-between lg:justify-end px-4 sm:px-8 border-b border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border">
             <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full lg:hidden hover:bg-bg-secondary dark:hover:bg-gray-700 transition-colors">
                <Bars3Icon />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <VoiceAssistant setActivePage={setActivePage} />
                 <ThemeChanger theme={theme} setTheme={setTheme} />
                <button className="p-2 rounded-full hover:bg-bg-secondary dark:hover:bg-gray-700 ethnic:hover:bg-ethnic-secondary/20 craftsman:hover:bg-craftsman-secondary handloom:hover:bg-handloom-secondary terracotta:hover:bg-terracotta-secondary tribal:hover:bg-tribal-secondary madhubani:hover:bg-madhubani-secondary transition-colors">
                    <BellIcon />
                </button>
                <div className="relative" ref={menuRef}>
                    <button onClick={() => setMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-bg-secondary dark:hover:bg-gray-700 ethnic:hover:bg-ethnic-secondary/20 craftsman:hover:bg-craftsman-secondary handloom:hover:bg-handloom-secondary terracotta:hover:bg-terracotta-secondary tribal:hover:bg-tribal-secondary madhubani:hover:bg-madhubani-secondary transition-colors">
                        <UserCircleIcon />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-bg-primary dark:bg-gray-800 ethnic:bg-ethnic-bg craftsman:bg-craftsman-bg handloom:bg-handloom-bg terracotta:bg-terracotta-bg tribal:bg-tribal-bg madhubani:bg-madhubani-bg rounded-lg shadow-xl z-50 border border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border animate-fade-in-up">
                            <ul className="py-2">
                                <li className="px-4 py-2">
                                    <p className="font-semibold text-text-primary dark:text-gray-100">Artisan User</p>
                                    <p className="text-sm text-text-secondary dark:text-gray-400">artisan@example.com</p>
                                </li>
                                <hr className="my-2 border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border"/>
                                <li>
                                    <button onClick={() => { setActivePage(PAGES.find(p => p.id === 'profile')!); setMenuOpen(false); }} className="w-full text-left px-4 py-2 flex items-center text-text-secondary hover:bg-bg-secondary dark:hover:bg-gray-700 transition-colors">
                                        <UserCircleIcon className="w-5 h-5 mr-3"/> My Profile
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => { openChangePasswordModal(); setMenuOpen(false); }} className="w-full text-left px-4 py-2 flex items-center text-text-secondary hover:bg-bg-secondary dark:hover:bg-gray-700 transition-colors">
                                        <KeyIcon className="w-5 h-5 mr-3"/> Change Password
                                    </button>
                                </li>
                                <hr className="my-2 border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border"/>
                                <li>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 flex items-center text-red-500 hover:bg-red-500/10 transition-colors">
                                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3"/> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;