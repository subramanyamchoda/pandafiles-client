import React from "react";
import { Linkedin, Github, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">

      {/* HEADER */}
      <div className="text-center mb-2">
        <img
          src="tlogo.jpg"
          alt="logo"
          className="w-20 h-20 mx-auto mb-3 rounded-xl shadow-lg"
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          📞 Contact Us
        </h1>
        <p className="text-gray-400 mt-2 max-w-md">
          Got a question or feedback? We'd love to hear from you!
        </p>
      </div>

      {/* CONTACT CARD */}
      <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-lg w-full max-w-md space-y-3">

        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
          <span>📧</span>
          <span className="text-sm break-all">
            subramanyamchoda50@gmail.com
          </span>
        </div>

        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
          <span>📱</span>
          <span className="text-sm">+91 8919348949</span>
        </div>

        <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
          <span>📍</span>
          <span className="text-sm">Ongole, India</span>
        </div>

        {/* CTA */}
        <a
          href="mailto:subramanyamchoda50@gmail.com"
          className="block text-center mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          ✉️ Send Email
        </a>

        <a
          href="tel:8919348949"
          className="block text-center mt-2 bg-gradient-to-r from-green-500 to-teal-500 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          📞 Call Now
        </a>
      </div>

      {/* SOCIAL LINKS */}
      <div className="flex gap-6 mt-5">
        
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition"
        >
          <Facebook size={22} />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition"
        >
          <Instagram size={22} />
        </a>

        <a
          href="https://www.linkedin.com/in/subramanyam-choda-29238a305/"
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-blue-700 transition"
        >
          <Linkedin size={22} />
        </a>

        <a
          href="https://github.com/subramanyamchoda"
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-600 transition"
        >
          <Github size={22} />
        </a>

      </div>

    </div>
  );
};

export default Contact;