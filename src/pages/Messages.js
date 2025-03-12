import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Messages = () => {
  const navigate = useNavigate();
  const { conversations = [] } = useContext(AppContext);
  
  // Sample conversations data if your context isn't providing any
  const sampleConversations = [
    {
      id: '1',
      name: 'Alex',
      lastMessage: 'Looking forward to our tennis match!',
      time: '2m ago',
      unread: true
    },
    {
      id: '2',
      name: 'Sam',
      lastMessage: 'See you at the gym tomorrow',
      time: '1h ago',
      unread: false
    },
    {
      id: '3',
      name: 'Jordan',
      lastMessage: 'The concert was amazing!',
      time: '2d ago',
      unread: false
    }
  ];

  // Use sample data if no conversations exist in context
  const displayConversations = conversations.length > 0 ? conversations : sampleConversations;

  return (
    <div className="h-full w-full flex flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 w-full">
        <div className="flex items-center p-4">
          <button 
            className="mr-4"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
      </header>
      
      <div className="flex-1 overflow-auto w-full">
        {displayConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 p-4 w-full">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">No messages yet</h3>
            <p className="text-gray-500 text-center">
              Connect with people by joining activities or creating your own.
            </p>
            <button 
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold"
              onClick={() => navigate('/')}
            >
              Find Activities
            </button>
          </div>
        ) : (
          <div className="w-full divide-y divide-gray-200">
            {displayConversations.map(chat => (
              <div 
                key={chat.id} 
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer w-full"
                onClick={() => navigate(`/messages/${chat.id}`)}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mr-4 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {chat.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{chat.name}</h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-sm ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'} truncate`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread && (
                      <span className="ml-2 w-3 h-3 bg-primary-500 rounded-full flex-shrink-0"></span>
                    )}
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

export default Messages;