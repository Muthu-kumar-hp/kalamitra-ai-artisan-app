



import React, { useState, useEffect } from 'react';
import { Page, Language, Theme, ThemeCustomization } from './types';
import { LANGUAGES, PAGES, THEME_CUSTOMIZATIONS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Storyteller from './components/Storyteller';
import MarketingAssistant from './components/MarketingAssistant';
import TrendRecommender from './components/TrendRecommender';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import AssistantChat from './components/AssistantChat';
import ProductShowcase from './components/ProductShowcase';
import { Button } from './components/common/Button';
import { ArrowLeftIcon } from './components/Icons';
import Login from './components/Login';
import Signup from './components/Signup';
import ChangePasswordModal from './components/ChangePasswordModal';
import ForgotPassword from './components/ForgotPassword';
import ConfirmationModal from './components/common/ConfirmationModal';
import { Product } from './data/products';
import ProductDetail from './components/ProductDetail';


export default function App() {
  const [theme, setTheme] = useState<Theme>(Theme.ETHNIC);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [pageHistory, setPageHistory] = useState<Page[]>([PAGES[0]]);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [themeCustomization, setThemeCustomization] = useState<ThemeCustomization>({
      pattern: 'Lines',
      intensity: 'Normal',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'signup' | 'forgotPassword'>('login');
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const activePage = pageHistory[pageHistory.length - 1];

  const setActivePage = (page: Page) => {
    // Avoid pushing the same page consecutively
    if (activePage.id !== page.id) {
        setPageHistory(prev => [...prev, page]);
    }
    setSelectedProduct(null); // Clear product view when changing pages
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
        setPageHistory(prev => prev.slice(0, -1));
    }
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const confirmAndLogout = () => {
    // First, set the auth state to redirect to the login page
    setIsAuthenticated(false);
    setAuthPage('login');

    // Then, reset any other application state for a clean slate
    setPageHistory([PAGES[0]]);
    
    // Finally, close any open modals
    setChangePasswordModalOpen(false);
    setLogoutModalOpen(false);
  };

  const openChangePasswordModal = () => setChangePasswordModalOpen(true);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
  };


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...Object.values(Theme)); // Remove all theme classes
    root.classList.add(theme); // Add the current theme class
    if (theme === Theme.DARK || theme === Theme.CRAFTSMAN || theme === Theme.TRIBAL) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const customOptions = THEME_CUSTOMIZATIONS[theme];
    if (customOptions) {
        const { patterns, intensities } = customOptions;
        
        const currentPattern = themeCustomization.pattern && patterns.includes(themeCustomization.pattern) 
            ? themeCustomization.pattern 
            : patterns[0];
        
        const currentIntensity = themeCustomization.intensity && intensities.includes(themeCustomization.intensity)
            ? themeCustomization.intensity
            : 'Normal';

        const opacityMap = { Subtle: 0.05, Normal: 0.15, Vibrant: 0.25 };
        root.style.setProperty('--bg-pattern-opacity', String(opacityMap[currentIntensity]));

        const patternId = `pattern-${theme}-${currentPattern.toLowerCase()}`;
        root.style.setProperty('--bg-pattern-dynamic', `url(#${patternId})`);
    } else {
        root.style.removeProperty('--bg-pattern-opacity');
        root.style.removeProperty('--bg-pattern-dynamic');
    }
  }, [theme, themeCustomization]);

  const renderActivePage = () => {
    switch (activePage.id) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'storyteller':
        return <Storyteller language={language} />;
      case 'marketing':
        return <MarketingAssistant language={language} />;
      case 'trends':
        return <TrendRecommender />;
      case 'marketplace':
        return <Marketplace onProductSelect={handleProductSelect} />;
      case 'showcase':
        return <ProductShowcase onProductSelect={handleProductSelect} />;
      case 'profile':
        return (
          <Profile
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            themeCustomization={themeCustomization}
            setThemeCustomization={setThemeCustomization}
            handleLogout={handleLogout}
            openChangePasswordModal={openChangePasswordModal}
          />
        );
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };
  
  const renderAuthContent = () => {
    switch (authPage) {
        case 'login':
            return <Login setIsAuthenticated={setIsAuthenticated} setAuthPage={setAuthPage} />;
        case 'signup':
            return <Signup setIsAuthenticated={setIsAuthenticated} setAuthPage={setAuthPage} />;
        case 'forgotPassword':
            return <ForgotPassword setAuthPage={setAuthPage} />;
        default:
            return <Login setIsAuthenticated={setIsAuthenticated} setAuthPage={setAuthPage} />;
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50">
        {renderAuthContent()}
      </div>
    );
  }

  return (
    <div className={`flex h-screen font-sans bg-bg-secondary text-text-primary dark:bg-gray-800 dark:text-gray-200 ethnic:bg-ethnic-bg ethnic:text-ethnic-text craftsman:bg-craftsman-bg craftsman:text-craftsman-text handloom:bg-handloom-bg handloom:text-handloom-text terracotta:bg-terracotta-bg terracotta:text-terracotta-text tribal:bg-tribal-bg tribal:text-tribal-text madhubani:bg-madhubani-bg madhubani:text-madhubani-text`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header 
          setActivePage={setActivePage} 
          theme={theme} 
          setTheme={setTheme} 
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
          openChangePasswordModal={openChangePasswordModal} 
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={handleBackFromDetail} />
          ) : (
            <>
              {activePage.id !== 'dashboard' && (
                <Button variant="secondary" onClick={goBack} className="mb-4 inline-flex items-center group">
                  <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                  <span>Back</span>
                </Button>
              )}
              {renderActivePage()}
            </>
          )}
        </main>
      </div>
      {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-30 lg:hidden"></div>}
      <AssistantChat isOpen={isChatOpen} setIsOpen={setChatOpen} />
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={() => setChangePasswordModalOpen(false)} />
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={confirmAndLogout}
        title="Are you sure you want to logout?"
        confirmText="Yes, Logout"
      >
        You will be returned to the login page.
      </ConfirmationModal>
    </div>
  );
}
