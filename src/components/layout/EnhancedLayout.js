import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EnhancedNavigation from './EnhancedNavigation';

const EnhancedLayout = ({ children }) => {
  const location = useLocation();
  const [pageTransition, setPageTransition] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);
  
  // Handle page transitions
  useEffect(() => {
    if (prevPath !== location.pathname) {
      setPageTransition(true);
      
      // Short timeout to allow animation to complete
      setTimeout(() => {
        setPrevPath(location.pathname);
        setPageTransition(false);
      }, 300);
    }
  }, [location.pathname, prevPath]);
  
  // Determine if navigation should be hidden (like on onboarding screen)
  const hideNavigation = location.pathname === '/welcome';
  
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 bg-gray-50 overflow-hidden relative">
      <main 
        className={`flex-1 overflow-auto pb-16 transition-all duration-300 ${
          pageTransition ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`} style={{ minWidth: '28rem' }}
      >
        {children}
      </main>
      
      {/* Decorative Circle Backgrounds */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-5 -translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-secondary-500 rounded-full opacity-5 translate-x-1/4 translate-y-1/4 z-0"></div>
      
      {/* Bottom Navigation */}
      {!hideNavigation && <EnhancedNavigation />}
      
      {/* Loading Indicator */}
      {pageTransition && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default EnhancedLayout;