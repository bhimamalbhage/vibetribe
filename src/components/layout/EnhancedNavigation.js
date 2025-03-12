import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MessageSquare, Heart, User } from 'lucide-react';

const EnhancedNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  
  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 pt-2 pb-6 px-2 rounded-t-3xl shadow-lg z-20">
      <div className="flex justify-around items-center">
        {/* Explore Button */}
        <NavButton 
          icon={<Search size={20} />} 
          label="Explore" 
          isActive={path === '/'} 
          onClick={() => navigate('/')}
        />
        
        {/* Messages Button */}
        <NavButton 
          icon={<MessageSquare size={20} />} 
          label="Messages" 
          isActive={path.includes('/messages')} 
          onClick={() => navigate('/messages')}
          hasNotification={true}
        />
        
        {/* Create Activity Button */}
        <CreateButton onClick={() => navigate('/create')} />
        
        {/* Favorites Button */}
        <NavButton 
          icon={<Heart size={20} />} 
          label="Favorites" 
          isActive={path.includes('/favorites')} 
          onClick={() => {}}
        />
        
        {/* Profile Button */}
        <NavButton 
          icon={<User size={20} />} 
          label="Profile" 
          isActive={path === '/profile'} 
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, isActive, onClick, hasNotification }) => {
  return (
    <button 
      className={`flex flex-col items-center py-1 px-3 relative ${
        isActive 
          ? 'text-primary-500' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-xl transition-all ${
        isActive 
          ? 'bg-primary-100 text-primary-500 scale-110 shadow-sm' 
          : 'text-gray-400'
      }`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 font-medium ${
        isActive ? 'text-primary-500' : 'text-gray-500'
      }`}>
        {label}
      </span>
      
      {/* Notification indicator */}
      {hasNotification && !isActive && (
        <span className="absolute top-0 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
      )}
    </button>
  );
};

const CreateButton = ({ onClick }) => {
  return (
    <button 
      className="relative -top-5 flex flex-col items-center"
      onClick={onClick}
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg animate-pulse-slow transform hover:scale-105 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <span className="text-xs mt-1 text-gray-500 font-medium">Create</span>
    </button>
  );
};

export default EnhancedNavigation;