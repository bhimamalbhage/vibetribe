import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MessageSquare, Heart, User } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 bg-gray-50">
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200">
        <div className="flex justify-around items-center p-4">
          {/* Explore Button */}
          <button 
            className={`flex flex-col items-center ${path === '/' ? 'text-primary-500' : 'text-gray-500'}`}
            onClick={() => navigate('/')}
          >
            <Search size={24} />
            <span className="text-xs mt-1">Explore</span>
          </button>
          
          {/* Messages Button */}
          <button 
            className={`flex flex-col items-center ${path.includes('/messages') ? 'text-primary-500' : 'text-gray-500'}`}
            onClick={() => navigate('/messages')}
          >
            <MessageSquare size={24} />
            <span className="text-xs mt-1">Messages</span>
          </button>
          
          {/* Create Activity Button */}
          <button 
            className="flex flex-col items-center justify-center w-14 h-14 bg-primary-500 rounded-full text-white -mt-5"
            onClick={() => navigate('/create')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          {/* Favorites Button */}
          <button 
            className={`flex flex-col items-center ${path.includes('/activity') ? 'text-primary-500' : 'text-gray-500'}`}
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Favorites</span>
          </button>
          
          {/* Profile Button */}
          <button 
            className={`flex flex-col items-center ${path === '/profile' ? 'text-primary-500' : 'text-gray-500'}`}
            onClick={() => navigate('/profile')}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;