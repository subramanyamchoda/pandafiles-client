import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://panda-files.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.clear();
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 pt-24">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">
          👋 Welcome back,{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {user.name}
          </span>
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your files and account
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT - PROFILE */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-lg text-center">

          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-green-400"
          />

          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-5 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
          >
            🔒 Logout
          </button>
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">

          <Link
            to="/upload"
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 hover:scale-105 transition shadow-lg"
          >
            <div className="text-4xl mb-3">📤</div>
            <h3 className="text-lg font-semibold">Upload Files</h3>
            <p className="text-gray-400 text-sm mt-1">
              Add new files to your storage
            </p>
          </Link>

          <Link
            to="/userfiles"
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 hover:scale-105 transition shadow-lg"
          >
            <div className="text-4xl mb-3">📁</div>
            <h3 className="text-lg font-semibold">Your Files</h3>
            <p className="text-gray-400 text-sm mt-1">
              View and manage your uploads
            </p>
          </Link>

          <Link
            to="/files"
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 hover:scale-105 transition shadow-lg"
          >
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-lg font-semibold">Public Files</h3>
            <p className="text-gray-400 text-sm mt-1">
              Explore shared files
            </p>
          </Link>

          <Link
            to="/"
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 hover:scale-105 transition shadow-lg"
          >
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="text-lg font-semibold">Home</h3>
            <p className="text-gray-400 text-sm mt-1">
              Go back to homepage
            </p>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;