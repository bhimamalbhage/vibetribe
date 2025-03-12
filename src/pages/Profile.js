import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { upcomingActivitiesData } from '../data/sampleData';

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile } = useContext(AppContext);

  return (
    <div className="flex-1 overflow-auto pb-16">
      <header className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">My Profile</h1>
        </div>
        <Settings size={20} />
      </header>
      
      <div className="p-4 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
          {userProfile.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold">{userProfile.name}</h2>
        <p className="text-gray-500">{userProfile.location}</p>
        
        <div className="flex justify-center space-x-6 mt-4">
          <div className="text-center">
            <div className="font-bold">{userProfile.totalActivities}</div>
            <div className="text-xs text-gray-500">Activities</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{userProfile.totalFriends}</div>
            <div className="text-xs text-gray-500">Friends</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{userProfile.rating} ★</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>
        
        <button className="mt-6 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Edit Profile
        </button>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold mb-3">My Interests</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((interest, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold mb-3">Upcoming Activities</h3>
        <div className="space-y-3">
          {upcomingActivitiesData.map((activity) => (
            <div key={activity.id} className="flex items-center p-3 bg-white rounded-lg shadow">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center text-primary-600 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{activity.title}</div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold mb-3">My Activity History</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white rounded-lg shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center text-primary-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-semibold">Beach Volleyball</div>
              <div className="text-sm text-gray-500">Last week with 3 people</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-white rounded-lg shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center text-primary-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-semibold">Coffee Meetup</div>
              <div className="text-sm text-gray-500">2 weeks ago with 2 people</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;