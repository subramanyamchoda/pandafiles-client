import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUploader from './FileUploader';
import FileList from './FileList';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import GoogleAuth from './GoogleAuth';
import Contact from './Contact';
import Dashboard from './Dashboard';
import UserFiles from './UserFiles';
import { motion } from 'framer-motion';

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });

  // Sync user state with localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Clear user state
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} setUser={setUser} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<FileUploader />} />
          <Route path="/files" element={<FileList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userfiles" element={<UserFiles />} />
          <Route path="/login" element={<GoogleAuth setUser={setUser} />} />
        </Routes>
      </motion.div>

      <Footer />
    </Router>
  );
};

export default App;
