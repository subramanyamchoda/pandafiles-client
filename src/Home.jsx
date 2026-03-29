import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    // Register Service Worker (optimized)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const features = [
    {
      icon: "📁",
      title: "All File Types",
      desc: "Upload images, videos, PDFs, and more.",
    },
    {
      icon: "⚡",
      title: "Fast Access",
      desc: "Instantly access your files anytime.",
    },
    {
      icon: "🔒",
      title: "Secure Storage",
      desc: "Your files are safe and protected.",
    },
    {
      icon: "🔍",
      title: "Quick Search",
      desc: "Find files in seconds.",
    },
    {
      icon: "☁️",
      title: "Cloud Sync",
      desc: "Access from any device.",
    },
    {
      icon: "⬇️",
      title: "Easy Download",
      desc: "Download anytime easily.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 pt-6">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          🐼 <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Panda Files
          </span>
        </h1>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
          Store, manage, and share your files securely with lightning-fast performance.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">

          <Link
            to="/upload"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition shadow-lg"
          >
            🚀 Upload Files
          </Link>
          
           <Link
            to="/files"
            className="px-6 py-3 bg-blue-500 border border-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition"
          >
            📂 View Files
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition"
          >
            🔐 Login
          </Link>

        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {["panda.webp", "panda1.webp"].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="preview"
            loading="lazy"
            className="w-72 md:w-80 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          />
        ))}
      </div>

      {/* FEATURES */}
      <div className="mt-16 max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-lg hover:scale-105 transition duration-300 text-center"
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{f.desc}</p>
          </div>
        ))}

      </div>

      {/* INFO SECTION */}
      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">
          📌 Why Choose Panda Files?
        </h2>

        <p className="text-gray-400">
          Panda Files is built for students, developers, and professionals who
          need a fast, reliable, and secure file storage system. Access your data
          anytime, anywhere with ease.
        </p>
      </div>

      {/* FOOTER CTA */}
      

    </div>
  );
};

export default Home;