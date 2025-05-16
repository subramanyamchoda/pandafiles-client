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

    // Initialize Google AdSense ads safely
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        // Push once for each ad block
        window.adsbygoogle.push({});
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsense push error", e);
      }
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

      {/* AdSense Ad Block */}
      <div className="my-6 w-full flex flex-col gap-6 justify-center items-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "320px" }}
          data-ad-client="ca-pub-1417536970473743"
          data-ad-slot="7484094536"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-1417536970473743"
          data-ad-slot="9203552076"
        ></ins>
      </div>
    </div>
  );
};

export default Home;
