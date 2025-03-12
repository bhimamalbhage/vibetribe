import React, { createContext, useState, useEffect } from 'react';
import { activitiesData } from '../data/sampleData';

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State for activities
  const [activities, setActivities] = useState(activitiesData);
  
  // State for user profile (simplified for now)
  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: 'Ethan Hunt',
    location: 'New York, NY',
    interests: ['Tennis', 'Hiking', 'Live Music', 'Photography', 'Travel'],
    totalActivities: 25,
    totalFriends: 42,
    rating: 4.9,
  });
  
  // State for messages
  const [conversations, setConversations] = useState([
    { 
      id: 1, 
      userId: 2,
      name: 'Alex', 
      lastMessage: 'Looking forward to our tennis match!', 
      time: '2m ago', 
      unread: true,
      messages: [
        { id: 1, sender: 2, text: "Hi there! I saw your tennis activity. What's your skill level?", time: '10:30 AM' },
        { id: 2, sender: 1, text: "Hey! I'm intermediate. Been playing for about 3 years. How about you?", time: '10:32 AM' },
        { id: 3, sender: 2, text: "I'm a beginner but eager to learn! Is that okay?", time: '10:33 AM' },
        { id: 4, sender: 1, text: "Absolutely! I'd be happy to play with you and share some tips. Looking forward to our tennis match!", time: '10:35 AM' },
      ]
    },
    { 
      id: 2, 
      userId: 3,
      name: 'Sam', 
      lastMessage: 'See you at the gym tomorrow', 
      time: '1h ago', 
      unread: false,
      messages: [
        { id: 1, sender: 1, text: "Hey Sam, are we still on for the gym tomorrow?", time: '9:15 AM' },
        { id: 2, sender: 3, text: "Definitely! I'll be there at 7AM sharp.", time: '9:20 AM' },
        { id: 3, sender: 1, text: "Perfect! Looking forward to it.", time: '9:22 AM' },
        { id: 4, sender: 3, text: "See you at the gym tomorrow", time: '9:25 AM' },
      ]
    },
    { 
      id: 3, 
      userId: 4,
      name: 'Jordan', 
      lastMessage: 'The concert was amazing!', 
      time: '2d ago', 
      unread: false,
      messages: [
        { id: 1, sender: 4, text: "The concert was amazing!", time: '2d ago' },
        { id: 2, sender: 1, text: "It really was! We should go to more shows together.", time: '2d ago' },
      ]
    },
  ]);
  
  // Function to add a new activity
  const addActivity = (activity) => {
    const newActivity = {
      id: activities.length + 1,
      ...activity,
      user: userProfile.name,
      distance: '0.1 miles away' // This would be calculated in a real app
    };
    
    setActivities([newActivity, ...activities]);
  };
  
  // Function to send a message
  const sendMessage = (conversationId, text) => {
    const updatedConversations = conversations.map(convo => {
      if (convo.id === conversationId) {
        const newMessage = {
          id: convo.messages.length + 1,
          sender: userProfile.id,
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        return {
          ...convo,
          messages: [...convo.messages, newMessage],
          lastMessage: text,
          time: 'Just now'
        };
      }
      return convo;
    });
    
    setConversations(updatedConversations);
  };
  
  // Value object to be provided to consumers
  const contextValue = {
    activities,
    userProfile,
    conversations,
    addActivity,
    sendMessage
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};