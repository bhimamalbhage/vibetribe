import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { categoriesData } from '../data/sampleData';

const CreateActivity = () => {
  const navigate = useNavigate();
  const { addActivity } = useContext(AppContext);
  
  // Get category names excluding "All"
  const categories = categoriesData.filter(category => category.name !== 'All').map(category => category.name);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    type: categories[0],
    location: '',
    date: '',
    time: '',
    description: '',
    maxParticipants: 1
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format date and time for the activity
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      const formattedDate = dateTime.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      const formattedTime = dateTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit'
      });
      
      // Create activity object
      const newActivity = {
        type: formData.type,
        title: formData.title,
        location: formData.location,
        time: `${formattedDate}, ${formattedTime}`,
        description: formData.description,
        dateTime: dateTime.toISOString(),
        maxParticipants: parseInt(formData.maxParticipants)
      };
      
      // Add the activity
      addActivity(newActivity);
      
      // Navigate to home
      navigate('/');
    }
  };

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
        <h1 className="text-xl font-semibold">Create Activity</h1>
      </header>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Tennis Partner Needed"
            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            name="type"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formData.type}
            onChange={handleChange}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className={`w-full p-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              className={`w-full p-3 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`}
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Describe your activity, what to expect, etc."
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
          <select 
            name="maxParticipants"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={formData.maxParticipants}
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5+</option>
          </select>
        </div>
        
        <button 
          type="submit"
          className="w-full p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg mt-6 hover:opacity-90 transition-opacity"
        >
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;