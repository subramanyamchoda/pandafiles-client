import React, { useState, useCallback } from "react";
import axios from "axios";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    setMessage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    setMessage("");
  };

  const removeFile = useCallback((name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }, []);

  const uploadFiles = async () => {
    if (!files.length) {
      setMessage("⚠️ Please select files.");
      return;
    }

    setUploading(true);
    setMessage("");

    const userId = localStorage.getItem("userId");
    const url = userId
      ? `https://panda-files.onrender.com/files/upload/${userId}`
      : `https://panda-files.onrender.com/files/upload`;

    try {
      await Promise.all(
        files.map((file) => {
          const formData = new FormData();
          formData.append("file", file);

          return axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: !!userId,
            onUploadProgress: (e) => {
              const percent = Math.round((e.loaded * 100) / e.total);
              setProgress((prev) => ({
                ...prev,
                [file.name]: percent,
              }));
            },
          });
        })
      );

      setMessage("✅ Upload completed successfully!");
      setFiles([]);
      setProgress({});
    } catch {
      setMessage("❌ Upload failed. Try again.");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 pt-10">

      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Upload Files 🚀
        </h1>
        <p className="text-gray-400 mt-3">
          Fast, secure & easy file uploads
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="max-w-2xl mx-auto bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-3xl p-10 text-center shadow-2xl hover:shadow-green-500/10 transition duration-300"
      >
        <div className="text-6xl mb-4 animate-bounce">📤</div>

        <h2 className="text-xl font-semibold mb-2">
          Drag & Drop Files Here
        </h2>

        <p className="text-gray-400 text-sm mb-3">
          or click below to browse your files
        </p>

        <label className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl cursor-pointer font-semibold shadow-lg hover:scale-105 transition">
          Browse Files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div className="max-w-2xl mx-auto mt-5 space-y-4">
            
            <button
            onClick={uploadFiles}
            disabled={uploading}
            className="w-full mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition shadow-lg disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload All Files"}
          </button>
          {files.map((file) => (
            <div
              key={file.name}
              className="bg-gray-800/70 backdrop-blur-lg p-5 rounded-2xl border border-gray-700 shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-sm font-medium truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-400 hover:text-red-500 text-lg"
                >
                  ✖
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${progress[file.name] || 0}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-400 mt-1 text-right">
                  {progress[file.name] || 0}%
                </p>
              </div>
            </div>
          ))}

          {/* UPLOAD BUTTON */}
          
        </div>
      )}

      {/* MESSAGE */}
      {message && (
        <div className="text-center mt-8">
          <p className="text-gray-300">{message}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;