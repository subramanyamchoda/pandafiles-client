import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, Search } from "lucide-react";

const Home = () => {
  useEffect(() => {
    // Register Service Worker for push notification
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered");

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
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
  }, []);

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-4 py-8">
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
        className="text-lg text-center max-w-2xl mb-4"
      >
        Welcome to <strong>Panda Files</strong> – your secure and efficient file
        storage solution. Easily upload, manage, and share files with a simple
        drag-and-drop interface.
      </motion.p>

      {/* Images */}
      <div className="flex flex-wrap gap-5 justify-center items-center mb-6">
        {["panda.webp", "panda1.webp"].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Panda Files Screenshot ${index + 1}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="w-60 sm:w-72 md:w-80 max-w-full rounded-xl shadow-lg object-cover"
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-5xl">
        {[
          {
            icon: <File size={30} className="text-yellow-400" />,
            title: "Any File Type",
            desc: "Upload and manage images, PDFs, videos, zip files and more.",
          },
          {
            icon: <Search size={30} className="text-green-400" />,
            title: "Quick Search",
            desc: "Find your files instantly using keywords or file types.",
          },
          {
            icon: <UploadCloud size={30} className="text-blue-400" />,
            title: "Bulk Upload",
            desc: "Upload multiple files at once with drag-and-drop.",
          },
          {
            icon: <File size={30} className="text-pink-400" />,
            title: "Safe & Secure",
            desc: "All your files are securely stored with encryption.",
          },
          {
            icon: <Search size={30} className="text-indigo-400" />,
            title: "Preview Support",
            desc: "Preview PDFs, images and documents before downloading.",
          },
          {
            icon: <UploadCloud size={30} className="text-red-400" />,
            title: "Download Anytime",
            desc: "Access and download your files 24/7 from any device.",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="bg-white/20 bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mt-2">{feature.title}</h3>
            <p className="text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Replaced Ad Block with Informational Content */}
      <div className="my-10 w-full max-w-4xl px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          📌 Why Choose Panda Files?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-gray-300"
        >
          Panda Files is built for students, professionals, and teams who need a
          **fast**, **reliable**, and **user-friendly** cloud storage experience. Whether
          you're sharing project files or organizing your portfolio, Panda Files
          ensures everything is available exactly when you need it — on any device.
        </motion.p>
      </div>
    </div>
  );
};

export default Home;
