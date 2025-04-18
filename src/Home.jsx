import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, Search } from "lucide-react";

const Home = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // Desktop: Request permission automatically
    if (!isMobileDevice && Notification.permission !== "granted") {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        if (perm === "granted") showNotification();
      });
    } else if (!isMobileDevice && Notification.permission === "granted") {
      showNotification();
    }
  }, []);

  const showNotification = () => {
    if (Notification.permission === "granted") {
      const notif = new Notification("📂 Welcome to Panda Files!", {
        body: "Upload, manage, and download your files with ease 🐼",
        icon: "/tlogo.jpg", // Make sure this icon is in your /public folder
        vibrate: [200, 100, 300],
        requireInteraction: true,
      });

      notif.onclick = () => {
        window.open("https://pandafiles.vercel.app", "_blank");
      };
    }
  };

  const handleMobileNotification = () => {
    Notification.requestPermission().then((perm) => {
      setPermission(perm);
      if (perm === "granted") showNotification();
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-4">
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
        Upload, manage, and access your files seamlessly. <br />
        <strong>Drag and drop multiple files</strong> or <strong>browse and upload</strong> with ease.
      </motion.p>

      {/* Mobile Notification Button */}
      {isMobile && permission !== "granted" && (
        <button
          onClick={handleMobileNotification}
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
        >
          Enable Notification
        </button>
      )}

      {/* Image Section */}
      <div className="flex flex-wrap gap-5 justify-center items-center mb-6">
        {["panda.webp", "panda1.webp"].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Panda Files ${index + 1}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="w-60 sm:w-72 md:w-80 max-w-full rounded-xl shadow-lg object-cover"
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-4xl mt-3">
        {[
          {
            icon: <File size={30} className="text-yellow-400" />,
            title: "Any File Type",
            desc: "Upload and manage images, PDFs, videos, and more.",
          },
          {
            icon: <Search size={30} className="text-green-400" />,
            title: "Quick Search",
            desc: "Find your files instantly with smart search.",
          },
          {
            icon: <UploadCloud size={30} className="text-blue-400" />,
            title: "Bulk Upload",
            desc: "Upload multiple files at once without any hassle.",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
            className="bg-white/20 bg-gray-700 p-4 rounded-xl shadow-lg flex flex-col items-center text-center"
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
