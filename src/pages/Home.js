import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, Calendar, Bell, User } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { categoriesData } from '../data/sampleData';

const Home = () => {
  const navigate = useNavigate();
  const { activities } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter activities based on selected category and search query
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'All' || activity.type === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          activity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  return (
    <div className="flex-1 overflow-auto pb-16">
      <header className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-500">VibeTribe</h1>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gray-100 rounded-full">
              <Bell size={20} />
            </div>
            <div 
              className="p-2 bg-gray-100 rounded-full cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <User size={20} />
            </div>
          </div>
        </div>
        
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search activities, interests, or location"
            className="w-full p-3 pl-10 bg-gray-100 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        
        <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
          {categoriesData.map(category => (
            <button 
              key={category.id}
              className={`px-4 py-2 ${selectedCategory === category.name ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-full whitespace-nowrap`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Activities Near You</h2>
        
        {filteredActivities.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No activities found. Try a different search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map(activity => (
              <div 
                key={activity.id} 
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => navigate(`/activity/${activity.id}`)}
              >
                <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full mb-2">
                  {activity.type}
                </span>
                <h3 className="font-bold">{activity.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <Map size={16} className="mr-1" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar size={16} className="mr-1" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm">{activity.user}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.distance}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;