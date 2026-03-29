import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// 🚀 Lazy Load (BIG SPEED BOOST)
const Home = lazy(() => import("./Home"));
const FileUploader = lazy(() => import("./FileUploader"));
const FileList = lazy(() => import("./FileList"));
const Contact = lazy(() => import("./Contact"));
const Dashboard = lazy(() => import("./Dashboard"));
const UserFiles = lazy(() => import("./UserFiles"));
const GoogleAuth = lazy(() => import("./GoogleAuth"));

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // 🔄 Sync localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar user={user} setUser={setUser} onLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gray-900">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen text-white">
              ⏳ Loading...
            </div>
          }
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
        </Suspense>
      </div>

      {/* Footer */}
      <Footer />

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
};

export default App;