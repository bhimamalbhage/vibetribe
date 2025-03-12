import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Map, Calendar, ArrowLeft, Heart, Share2, MessageSquare, User, Users, Clock, MapPin } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const EnhancedActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Find the activity with the matching ID
  const activity = activities.find(a => a.id === parseInt(id));
  
  // Set initial animation
  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, []);
  
  // Get category color
  const getCategoryColor = (type) => {
    switch(type) {
      case 'Sports':
        return 'from-blue-500 to-blue-600';
      case 'Music':
        return 'from-purple-500 to-purple-600';
      case 'Travel':
        return 'from-teal-500 to-teal-600';
      case 'Fitness':
        return 'from-green-500 to-green-600';
      case 'Food':
        return 'from-orange-500 to-orange-600';
      case 'Arts':
        return 'from-pink-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  
  // Handle if activity is not found
  if (!activity) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Activity not found</h2>
        <button 
          className="mt-4 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto pb-16 bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-black to-transparent z-10"></div>
        
        {/* Activity Type Icon (centered in image) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getCategoryColor(activity.type)} flex items-center justify-center shadow-lg text-white p-2 ${isAnimating ? 'animate-float' : ''}`}>
            {activity.type === 'Sports' && 
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M4.93 4.93L9 9"></path>
                <path d="M14.83 9.17L19.07 4.93"></path>
                <path d="M14.83 14.83L19.07 19.07"></path>
                <path d="M9 14.83L4.93 19.07"></path>
              </svg>
            }
            {activity.type === 'Music' && 
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5.5" cy="17.5" r="2.5"></circle>
                <circle cx="17.5" cy="15.5" r="2.5"></circle>
                <path d="M8 17V5l12-2v12"></path>
              </svg>
            }
            {activity.type === 'Travel' && 
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17h18M3 17l2-9h14l2 9M8 17l-1.5 5h11L16 17"></path>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="M13 9h5"></path>
              </svg>
            }
            {activity.type === 'Fitness' && 
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5v14M18 5v14M6 9h12M6 15h12"></path>
              </svg>
            }
            {activity.type === 'Food' && 
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            }
            {activity.type === 'Arts' && 
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            }
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
          <button
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={20} className={isFavorite ? 'text-accent-500 fill-accent-500' : 'text-white'} />
          </button>
          <button
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          >
            <Share2 size={20} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Activity Details */}
      <div className="px-4 py-6">
        <div className={`transition-all duration-500 transform ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="flex justify-between items-start">
            <div>
              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 bg-gradient-to-r ${getCategoryColor(activity.type)} text-white`}>
                {activity.type}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">{activity.title}</h2>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium text-primary-500 bg-primary-50 px-2 py-1 rounded-lg flex items-center">
                <MapPin size={14} className="mr-1" />
                {activity.distance}
              </div>
            </div>
          </div>
          
          {/* Host Info Card */}
          <div className="mt-6 flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mr-3 flex items-center justify-center text-white font-bold shadow-sm">
              {activity.user.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">{activity.user}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    4.8 • 16 activities hosted
                  </div>
                </div>
                <button className="text-primary-500 text-sm font-medium hover:underline">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Location & Time */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500 mr-3">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Location</div>
                <div className="text-gray-600">{activity.location}</div>
                <button className="mt-1 text-xs text-primary-500 font-medium flex items-center">
                  View on map
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500 mr-3">
                <Clock size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Date & Time</div>
                <div className="text-gray-600">{activity.time}</div>
                <button className="mt-1 text-xs text-primary-500 font-medium flex items-center">
                  Add to calendar
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500 mr-3">
                <Users size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Participants</div>
                <div className="text-gray-600">1/4 spots filled</div>
                <div className="mt-2 flex">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">About this activity</h3>
            <p className="text-gray-600 leading-relaxed">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="fixed bottom-16 inset-x-0 p-4 max-w-md mx-auto z-10">
        <div className="p-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <button 
              className="flex-1 p-3 border border-gray-200 rounded-lg mr-3 flex items-center justify-center font-medium hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/messages')}
            >
              <MessageSquare size={18} className="mr-2 text-gray-600" />
              Message
            </button>
            <button 
              className="flex-1 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:shadow-md transition-shadow"
              onClick={() => navigate('/messages')}
            >
              Request to Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedActivityDetail;