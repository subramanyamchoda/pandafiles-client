import React, { useState, memo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://panda-files.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = ["Home", "Upload", "Files", "Contact"];

  return (
    <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <div className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🐼</span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Panda Files
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative group text-lg"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}

            {user ? (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="User"
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full border-2 border-green-400 cursor-pointer hover:scale-105 transition"
                />

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-xl p-4 border border-gray-700">
                    <p className="text-center font-semibold">{user.name}</p>

                    <Link
                      to="/dashboard"
                      className="mt-3 block text-center bg-green-500 hover:bg-green-600 py-2 rounded-lg transition"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-lg hover:text-gray-300">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl text-white">
          {navItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block py-3 text-lg text-center hover:text-gray-300 transition"
              onClick={closeMenu}
            >
              {item}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col items-center py-4">
              <img
                src={user.avatar}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-green-400"
              />
              <p className="mt-2 font-semibold">{user.name}</p>

              <Link
                to="/dashboard"
                className="mt-3 px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="mt-2 px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block py-3 text-lg text-center hover:text-gray-300 transition"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);