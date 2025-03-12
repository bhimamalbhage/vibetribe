import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Enhanced Layout
import EnhancedLayout from './components/layout/EnhancedLayout';

// Enhanced Pages
import EnhancedHome from './pages/EnhancedHome';
import EnhancedActivityDetail from './pages/EnhancedActivityDetail';
import CreateActivity from './pages/CreateActivity';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import ChatDetail from './pages/ChatDetail';
// import EnhancedOnboarding from './pages/EnhancedOnboarding';


// CSS
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* <Route path="/welcome" element={<EnhancedOnboarding />} /> */}
          <Route path="/" element={<EnhancedLayout><EnhancedHome /></EnhancedLayout>} />
          <Route path="/activity/:id" element={<EnhancedLayout><EnhancedActivityDetail /></EnhancedLayout>} />
          <Route path="/create" element={<EnhancedLayout><CreateActivity /></EnhancedLayout>} />
          <Route path="/profile" element={<EnhancedLayout><Profile /></EnhancedLayout>} />
          <Route path="/messages" element={<EnhancedLayout><Messages /></EnhancedLayout>} />
          <Route path="/messages/:id" element={<EnhancedLayout><ChatDetail /></EnhancedLayout>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;