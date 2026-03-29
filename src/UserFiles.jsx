import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserFiles();
  }, []);

  const fetchUserFiles = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `https://panda-files.onrender.com/auth/user/${userId}/files`
      );

      setFiles(res.data.files || []);
      setMessage(res.data.message || "Files loaded");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch files.");
    }
    setLoading(false);
  };

  // ✅ Optimized filtering (no extra state)
  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  const handleDownload = useCallback(async (fileId, filename, contentType) => {
    try {
      const res = await axios.get(
        `https://panda-files.onrender.com/auth/download/${fileId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Download failed");
    }
  }, []);

  const handleDelete = useCallback(async (fileId) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      await axios.delete(
        `https://panda-files.onrender.com/auth/delete/${fileId}`
      );
      setFiles((prev) => prev.filter((f) => f._id !== fileId));
    } catch {
      alert("Delete failed");
    }
  }, []);

  const getFileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    const icons = {
      pdf: "📕", doc: "📄", docx: "📄",
      xls: "📊", xlsx: "📊",
      mp4: "🎥", mp3: "🎵",
      zip: "📦", png: "🖼️", jpg: "🖼️"
    };
    return icons[ext] || "📁";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 md:px-10 pt-24">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Your Files
        </h1>
        <p className="text-gray-400 mt-2">
          Manage and access your uploaded files
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">

        {loading ? (
          <p className="text-center text-gray-400">Loading files...</p>
        ) : filteredFiles.length === 0 ? (
          <p className="text-center text-gray-400">{message}</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredFiles.map((file) => (
              <div
                key={file._id}
                className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition duration-300"
              >
                {/* Icon */}
                <div className="text-5xl text-center mb-3">
                  {getFileIcon(file.filename)}
                </div>

                {/* Name */}
                <p className="text-sm text-center truncate text-gray-300">
                  {file.filename}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      handleDownload(file._id, file.filename, file.contentType)
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg text-sm"
                  >
                    Download
                  </button>

                  <button
                    onClick={() => handleDelete(file._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default UserFiles;