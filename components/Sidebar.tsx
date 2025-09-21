import React from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const baseItemClass = "flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ease-in-out text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80";
  const activeItemClass = "bg-accent-secondary dark:bg-indigo-500/20 ethnic:bg-ethnic-secondary/20 craftsman:bg-craftsman-secondary handloom:bg-handloom-secondary terracotta:bg-terracotta-secondary tribal:bg-tribal-secondary madhubani:bg-madhubani-secondary text-accent-primary dark:text-indigo-300 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary font-semibold";
  const inactiveItemClass = "hover:bg-accent-secondary/50 dark:hover:bg-gray-700/50 ethnic:hover:bg-ethnic-secondary/10 craftsman:hover:bg-craftsman-secondary/50 handloom:hover:bg-handloom-secondary/50 terracotta:hover:bg-terracotta-secondary/50 tribal:hover:bg-tribal-secondary/50 madhubani:hover:bg-madhubani-secondary/50";

  const handlePageClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed inset-y-0 left-0 w-64 bg-bg-primary dark:bg-gray-900 ethnic:bg-ethnic-bg craftsman:bg-craftsman-bg handloom:bg-handloom-bg terracotta:bg-terracotta-bg tribal:bg-tribal-bg madhubani:bg-madhubani-bg p-4 flex flex-col border-r border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary">Artisan AI</span>
      </div>
      <ul className="flex-1">
        {PAGES.map((page) => (
          <li
            key={page.id}
            className={`${baseItemClass} ${activePage.id === page.id ? activeItemClass : inactiveItemClass}`}
            onClick={() => handlePageClick(page)}
          >
            <span className="w-6 h-6 mr-3">{page.icon}</span>
            <span className="font-medium">{page.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-center text-xs text-text-secondary/70">
        <p>&copy; 2024 Artisan AI</p>
        <p>Empowering Creators</p>
      </div>
    </nav>
  );
};

export default Sidebar;