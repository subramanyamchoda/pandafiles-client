import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, Search } from "lucide-react";

const Home = () => {
   useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      // Register the service worker
      navigator.serviceWorker
        .register("/sw.js") // Ensure your service worker file is at /sw.js
        .then((registration) => {
          console.log("Service Worker registered");

          // Request notification permission
          if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                sendWelcomeNotification();
              }
            });
          } else {
            sendWelcomeNotification();
          }
        })
        .catch((err) => console.error("Service Worker registration failed", err));
    }
  }, []);

  // Function to send a notification
  const sendWelcomeNotification = () => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("📂 Welcome to Panda Files!", {
          body: "Upload, manage, and download your files easily 🐼",
          icon: "/tlogo.jpg",
          vibrate: [200, 100, 200],
          requireInteraction: false,
        });
      });
    }
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-3"
      >
        🐼 Panda Files
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-center max-w-2xl mb-3"
      >
        Upload, manage, and access your files seamlessly. <br />
        <strong>Drag and drop multiple files</strong> or <strong>browse and upload</strong> with ease.
      </motion.p>

      {/* Image Section */}
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {["panda.webp", "panda1.webp"].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Panda Files Concept ${index + 1}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="w-60 sm:w-72 md:w-80 max-w-full rounded-xl shadow-lg object-cover"
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-4xl mt-3">
        {[{
          icon: <File size={30} className="text-yellow-400" />,
          title: "Any File Type",
          desc: "Upload and manage images, PDFs, videos, and more.",
        }, {
          icon: <Search size={30} className="text-green-400" />,
          title: "Quick Search",
          desc: "Find your files instantly with smart search.",
        }, {
          icon: <UploadCloud size={30} className="text-blue-400" />,
          title: "Bulk Upload",
          desc: "Upload multiple files at once without any hassle.",
        }].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
            className="bg-white/20 bg-gray-700 p-3 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mt-2">{feature.title}</h3>
            <p className="text-sm sm:text-base">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
