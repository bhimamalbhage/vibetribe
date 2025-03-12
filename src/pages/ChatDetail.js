import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conversations, userProfile, sendMessage } = useContext(AppContext);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  
  // Find the conversation with the matching ID
  const conversation = conversations.find(c => c.id === parseInt(id));
  
  // Handle if conversation is not found
  if (!conversation) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Conversation not found</h2>
        <button 
          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"
          onClick={() => navigate('/messages')}
        >
          Back to Messages
        </button>
      </div>
    );
  }
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation.messages]);
  
  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (messageText.trim()) {
      sendMessage(conversation.id, messageText);
      setMessageText('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10 flex items-center">
        <button 
          className="mr-4"
          onClick={() => navigate('/messages')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-xs">
            {conversation.name.charAt(0)}
          </div>
          <div className="font-semibold">{conversation.name}</div>
        </div>
      </header>
      
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        {conversation.messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === userProfile.id ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-lg p-3 max-w-xs ${
                message.sender === userProfile.id 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <span 
                className={`text-xs mt-1 block ${
                  message.sender === userProfile.id ? 'text-primary-100' : 'text-gray-500'
                }`}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button 
            type="submit"
            className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg disabled:opacity-50"
            disabled={!messageText.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;