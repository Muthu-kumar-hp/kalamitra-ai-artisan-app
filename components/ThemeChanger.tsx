import React, { useState, useRef, useEffect } from 'react';
import { Theme } from '../types';
import { THEMES } from '../constants';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeChangerProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeChanger: React.FC<ThemeChangerProps> = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const isDarkMode = theme === Theme.DARK || theme === Theme.CRAFTSMAN || theme === Theme.TRIBAL;

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full dark:hover:bg-gray-700 ethnic:hover:bg-ethnic-secondary/20 craftsman:hover:bg-craftsman-secondary handloom:hover:bg-handloom-secondary terracotta:hover:bg-terracotta-secondary tribal:hover:bg-tribal-secondary madhubani:hover:bg-madhubani-secondary transition-colors"
        aria-label="Change theme"
      >
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 dark:bg-gray-800 ethnic:bg-ethnic-bg craftsman:bg-craftsman-secondary handloom:bg-handloom-bg terracotta:bg-terracotta-bg tribal:bg-tribal-secondary madhubani:bg-madhubani-bg rounded-lg shadow-xl z-50 border dark:border-gray-700 ethnic:border-ethnic-secondary/20 craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border">
          <ul className="py-1">
            {THEMES.map((t) => (
              <li key={t}>
                <button
                  onClick={() => {
                    setTheme(t);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between
                    ${ theme === t
                        ? 'font-semibold dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary'
                        : 'dark:hover:bg-gray-700 ethnic:hover:bg-ethnic-secondary/20 craftsman:hover:bg-craftsman-bg handloom:hover:bg-handloom-secondary terracotta:hover:bg-terracotta-secondary tribal:hover:bg-tribal-bg madhubani:hover:bg-madhubani-secondary'
                    }`}
                >
                  {capitalize(t)}
                  {theme === t && (
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeChanger;