import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Map, Calendar } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities } = useContext(AppContext);
  
  // Find the activity with the matching ID
  const activity = activities.find(a => a.id === parseInt(id));
  
  // Handle if activity is not found
  if (!activity) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Activity not found</h2>
        <button 
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto pb-16">
      <header className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10 flex items-center">
        <button 
          className="mr-4"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Activity Details</h1>
      </header>
      
      <div className="p-4">
        <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-gray-500">Activity Image</span>
        </div>
        
        <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full mb-2">
          {activity.type}
        </span>
        <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
        
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <div>
            <div className="font-semibold">{activity.user}</div>
            <div className="text-sm text-gray-500">4.8 ★ (16 activities)</div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <Map className="mt-1 mr-3 text-gray-600" size={20} />
            <div>
              <div className="font-semibold">Location</div>
              <div className="text-gray-600">{activity.location}</div>
              <div className="text-sm text-gray-500">{activity.distance}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="mt-1 mr-3 text-gray-600" size={20} />
            <div>
              <div className="font-semibold">Date & Time</div>
              <div className="text-gray-600">{activity.time}</div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">About this activity</h3>
          <p className="text-gray-600">
            {activity.description}
          </p>
        </div>
        
        <button 
          className="w-full p-4 bg-primary-500 text-white font-semibold rounded-lg"
          onClick={() => navigate('/messages')}
        >
          Request to Join
        </button>
      </div>
    </div>
  );
};

export default ActivityDetail;