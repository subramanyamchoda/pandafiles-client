import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Moon, Sun } from "lucide-react";
import axios from "axios";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});
  const [message, setMessage] = useState("");
 


  const handleFileChange = (event) => {
    setFiles((prev) => [...prev, ...event.target.files]);
    setMessage("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles((prev) => [...prev, ...event.dataTransfer.files]);
    setMessage("");
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      setMessage("⚠️ Please select files to upload.");
      return;
    }
  
    setUploading(true);
    setMessage("");
  
  const userId = localStorage.getItem("userId"); // Retrieve userId
  console.log("User ID before upload:", userId); // Debugging step

  const uploadUrl = userId
    ? `https://panda-files.onrender.com/files/upload/${userId}`
    : "https://panda-files.onrender.com/files/upload";

  console.log("Uploading to:", uploadUrl);
  
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
  
        console.log(`Uploading file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
  
        const response = await axios.post(uploadUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: !!userId, // Include credentials only if user is logged in
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress((prev) => ({ ...prev, [file.name]: percent }));
          },
        });
  
        console.log("Upload Response:", response.data);
      }
  
      setMessage(`✅ ${userId ? "Your files have been uploaded successfully!" : "Guest upload successful!"}`);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      setMessage("❌ Error uploading files. Please try again.");
    }
  
    setUploading(false);
    setFiles([]);
    setProgress({});
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 bg-gray-900 p-4">
      <h1 className="text-2xl mb-5 text-center text-white">
        Upload multiple files at once. All file types are supported.
      </h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-lg text-center"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 text-gray-200">
            Upload Your Files
          </h1>
          <button onClick={toggleDarkMode} className="text-gray-700 text-gray-300">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Upload Box */}
        <label
          className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-400 border-gray-500 rounded-xl p-6 hover:bg-gray-100 hover:bg-gray-700 transition duration-300"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud size={48} className="text-gray-600 text-gray-300 mb-2" />
          <span className="text-gray-600 text-gray-300">
            Drag & Drop or Click to Upload
          </span>
          <input type="file" multiple className="hidden" onChange={handleFileChange} />
        </label>

        {/* Upload Button */}
        <button
          onClick={uploadFiles}
          className="mt-4 bg-blue-600 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:bg-blue-400 transition disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>

        {/* Message Feedback */}
        {message && (
          <p className="mt-3 text-sm text-gray-700 text-gray-300">{message}</p>
        )}
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 w-full max-w-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 text-gray-300 underline">
            Selected Files:
          </h3>
          <ul className="mt-2 text-sm text-gray-700 text-gray-300">
            {files.map((file) => (
              <li key={file.name} className="mt-1">
                {file.name} ({(file.size / 1024).toFixed(2)} KB) - {progress[file.name] || 0}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
