import React, { useState, useEffect } from "react";
import axios from "axios";

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserFiles();
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const fetchUserFiles = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://panda-files.onrender.com/auth/user/${userId}/files`
      );

      const fetchedFiles = response.data.files.map((file) => {
        let preview = null;
        if (file.contentType.startsWith("image/") && file.fileData?.data) {
          const blob = new Blob([new Uint8Array(file.fileData.data)], {
            type: file.contentType,
          });
          preview = URL.createObjectURL(blob);
        }
        return { ...file, preview };
      });

      setFiles(fetchedFiles);
      setFilteredFiles(fetchedFiles);
      setMessage(response.data.message || "Files fetched successfully.");
    } catch (error) {
      console.error("Error fetching files:", error);
      setMessage("❌ Failed to fetch files.");
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredFiles(
      files.filter((file) => file.filename.toLowerCase().includes(query))
    );
  };

  const handleDownload = async (fileId, filename, contentType) => {
    try {
      const response = await axios.get(
        `https://panda-files.onrender.com/auth/download/${fileId}`,
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename.replace(/\s+/g, "_"));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("❌ Error downloading file.");
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.delete(`https://panda-files.onrender.com/auth/delete/${fileId}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
      setFilteredFiles((prevFiltered) =>
        prevFiltered.filter((file) => file._id !== fileId)
      );
      alert("✅ File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("❌ Error deleting file.");
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    const fileIcons = {
      pdf: "📕",
      doc: "📄",
      docx: "📄",
      xls: "📊",
      xlsx: "📊",
      ppt: "📽️",
      pptx: "📽️",
      txt: "📜",
      html: "🌐",
      css: "🎨",
      js: "📜",
      zip: "📦",
      rar: "📦",
      mp3: "🎵",
      wav: "🎵",
      mp4: "🎥",
      avi: "🎥",
      mkv: "🎥",
      png: "🖼️",
      jpg: "🖼️",
      jpeg: "🖼️",
      gif: "🖼️",
      svg: "🖼️",
    };
    return fileIcons[extension] || "📁";
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100  bg-gray-900 w-full pt-25">

     <h1 className="w-full text-2xl font-bold text-gray-800  text-gray-200 mb-4 text-center">
  Your Uploaded Files
</h1>

      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full max-w-md p-2 border rounded-md shadow-md  bg-gray-800  text-white mb-4"
      />
      {loading ? (
        <p className="text-gray-700  text-gray-300">Loading files...</p>
      ) : filteredFiles.length > 0 ? (
        <ul className="w-full max-w-2xl bg-white  bg-gray-800 shadow-lg rounded-lg p-4 grid gap-4 sm:grid-cols-2 place-items-center">
          {filteredFiles.map((file) => (
            <li
              key={file._id}
              className="flex flex-col items-center p-3 border rounded-lg  border-white"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.filename}
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <span className="text-3xl">{getFileIcon(file.filename)}</span>
              )}
              <span className="text-gray-700  text-gray-300 text-sm mt-2 text-center">
                {file.filename}
              </span>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    handleDownload(file._id, file.filename, file.contentType)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700  bg-blue-500  hover:bg-blue-400"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700  bg-red-500  hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700  text-gray-300 text-center">
          {message || "No files found."}
        </p>
      )}
    </div>
  );
};

export default UserFiles;
