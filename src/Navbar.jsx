import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => { 
   const [isOpen, setIsOpen] = useState(false); 
   const [showDropdown, setShowDropdown] = useState(false); 
   const navigate = useNavigate();

   const handleLogout = async () => { 
      try { 
         await axios.post("https://panda-files.onrender.com/auth/logout", {}, { withCredentials: true });

         // Clear local storage and user state
         localStorage.removeItem("user");
         localStorage.removeItem("userId");
         setUser(null);

         // Redirect to login page
         navigate("/login");
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   return ( 
      <nav className="bg-gray backdrop-blur-lg shadow-lg w-full z-50"> 
         <div className="max-w-6xl mx-auto px-4"> 
            <div className="flex justify-between items-center py-4"> 
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-2xl font-bold text-white flex items-center">
                  🐼 Panda Files 
               </motion.div>

               {/* Desktop Navbar */}
               <div className="hidden md:flex space-x-8">
                  {["Home", "Upload", "Files", "Contact"].map((item) => (
                     <Link key={item} to={`/${item.toLowerCase()}`} className="text-xl text-white relative hover:text-gray-300 transition-all">
                        {item}
                     </Link>
                  ))}

                  {user ? (
                     <div className="relative user-menu">
                        <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border border-white cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
                        <AnimatePresence>
                           {showDropdown && (
                              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-4">
                                 <p className="text-center font-semibold">{user.name}</p>
                                 <Link to="/dashboard" className="mt-2 block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                                    Dashboard
                                 </Link>
                                 <button onClick={handleLogout} className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                                    Logout
                                 </button>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ) : (
                     <Link to="/login" className="text-xl text-white hover:text-gray-300">
                        Login
                     </Link>
                  )}
               </div>

               {/* Mobile Menu */}
               <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>
         </div>

         {/* Mobile Menu */}
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="md:hidden bg-gray-800/90 backdrop-blur-lg">
                  {["Home", "Upload", "Files", "Contact"].map((item) => (
                     <Link key={item} to={`/${item.toLowerCase()}`} className="block py-3 text-lg text-white text-center hover:text-gray-300 transition-all" onClick={() => setIsOpen(false)}>
                        {item}
                     </Link>
                  ))}

                  {user ? (
                     <div className="flex flex-col items-center py-4">
                        <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border border-white" />
                        <p className="mt-2 font-semibold text-white">{user.name}</p>
                        <Link to="/dashboard" className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all" onClick={() => setIsOpen(false)}>
                           Dashboard
                        </Link>
                        <button onClick={handleLogout} className="mt-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                           Logout
                        </button>
                     </div>
                  ) : (
                     <Link to="/login" className="block py-3 text-lg text-white text-center hover:text-gray-300 transition-all" onClick={() => setIsOpen(false)}>
                        Login
                     </Link>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
         <hr className="border-white border-1" />
      </nav>
   );
};

export default Navbar;
