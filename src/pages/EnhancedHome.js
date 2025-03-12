import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, Calendar, Bell, User, Heart } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { categoriesData } from '../data/sampleData';

const EnhancedHome = () => {
  const navigate = useNavigate();
  const { activities } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    // Auto-hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter activities based on selected category and search query
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'All' || activity.type === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });
  
  // Get activity category color
  const getCategoryColor = (type) => {
    switch(type) {
      case 'Sports':
        return 'from-blue-500 to-blue-600 shadow-blue-500/20';
      case 'Music':
        return 'from-purple-500 to-purple-600 shadow-purple-500/20';
      case 'Travel':
        return 'from-teal-500 to-teal-600 shadow-teal-500/20';
      case 'Fitness':
        return 'from-green-500 to-green-600 shadow-green-500/20';
      case 'Food':
        return 'from-orange-500 to-orange-600 shadow-orange-500/20';
      case 'Arts':
        return 'from-pink-500 to-pink-600 shadow-pink-500/20';
      default:
        return 'from-gray-500 to-gray-600 shadow-gray-500/20';
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-16 bg-gradient-to-br from-gray-50 to-white">
      {/* Welcome Banner */}
      {showWelcome && (
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 shadow-md animate-pulse-slow">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold">{greeting}!</h2>
              <p className="text-sm opacity-90">Ready to find your tribe?</p>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="p-1 bg-white bg-opacity-20 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <header className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="font-logo text-primary-500">Vibe</span>
            <span className="font-logo text-secondary-500">Tribe</span>
          </h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                <Bell size={20} className="text-gray-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>
            <div 
              className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full cursor-pointer shadow-glow flex items-center justify-center text-white font-medium text-sm"
              onClick={() => navigate('/profile')}
            >
              JS
            </div>
          </div>
        </div>
        
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Find your vibe..."
            className="w-full p-3 pl-10 bg-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        
        <div className="flex mt-4 space-x-2 overflow-x-auto py-2 no-scrollbar">
          {categoriesData.map(category => (
            <button 
              key={category.id}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.name 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform -translate-y-0.5' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Activities Near You</h2>
        
        {filteredActivities.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">No activities found</h3>
            <p className="text-gray-500">Try a different search or category</p>
            <button 
              className="mt-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredActivities.map(activity => (
              <div 
                key={activity.id} 
                className="bg-white p-4 rounded-2xl shadow-card cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                onClick={() => navigate(`/activity/${activity.id}`)}
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(activity.type)} flex items-center justify-center shadow-lg text-white p-2 mr-3`}>
                    {activity.type === 'Sports' && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M4.93 4.93L9 9"></path>
                        <path d="M14.83 9.17L19.07 4.93"></path>
                        <path d="M14.83 14.83L19.07 19.07"></path>
                        <path d="M9 14.83L4.93 19.07"></path>
                      </svg>
                    }
                    {activity.type === 'Music' && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="5.5" cy="17.5" r="2.5"></circle>
                        <circle cx="17.5" cy="15.5" r="2.5"></circle>
                        <path d="M8 17V5l12-2v12"></path>
                      </svg>
                    }
                    {activity.type === 'Travel' && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 17h18M3 17l2-9h14l2 9M8 17l-1.5 5h11L16 17"></path>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="M13 9h5"></path>
                      </svg>
                    }
                    {activity.type === 'Fitness' && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 5v14M18 5v14M6 9h12M6 15h12"></path>
                      </svg>
                    }
                    {activity.type === 'Food' && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </svg>
                    }
                    {activity.type === 'Arts' && 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{activity.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Map size={14} className="mr-1" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-accent-500 transition-colors">
                        <Heart size={18} />
                      </button>
                    </div>
                    
                    <div className="mt-3 flex items-center text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>{activity.time}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {activity.user.charAt(0)}
                        </div>
                        <span className="text-sm font-medium ml-2 text-gray-700">{activity.user}</span>
                      </div>
                      <div className="flex items-center text-xs font-medium text-primary-500 bg-primary-50 px-2 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        {activity.distance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedHome;