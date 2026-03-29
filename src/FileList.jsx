import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [fileType, setFileType] = useState("all");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("https://panda-files.onrender.com/files");
      setFiles(res.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDownload = async (filename) => {
    try {
      const res = await axios.get(
        `https://panda-files.onrender.com/files/${filename}`,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Download failed");
    }
  };

  const getIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    const map = {
      pdf: "📕",
      jpg: "🖼️",
      png: "🖼️",
      jpeg: "🖼️",
      gif: "🖼️",
      mp4: "🎥",
      mp3: "🎵",
      zip: "📦",
      xlsx: "📊",
      csv: "📊",
    };
    return map[ext] || "📁";
  };

  const filteredFiles = useMemo(() => {
    return files
      .filter((f) =>
        f.filename.toLowerCase().includes(search.toLowerCase())
      )
      .filter((f) => {
        if (fileType === "all") return true;
        if (fileType === "images") return /\.(jpg|png|jpeg|gif)$/i.test(f.filename);
        if (fileType === "pdf") return /\.pdf$/i.test(f.filename);
        if (fileType === "spreadsheet") return /\.(xlsx|csv)$/i.test(f.filename);
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.uploadDate) - new Date(a.uploadDate);
        if (sortOrder === "oldest") return new Date(a.uploadDate) - new Date(b.uploadDate);
        if (sortOrder === "az") return a.filename.localeCompare(b.filename);
        if (sortOrder === "za") return b.filename.localeCompare(a.filename);
        return 0;
      });
  }, [files, search, sortOrder, fileType]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 pt-24 ">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Your Files 📁
        </h1>
        <p className="text-gray-400 mt-2">
          Manage and download your uploaded files
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="🔍 Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>

        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="p-3 rounded-xl bg-gray-800 border border-gray-700"
        >
          <option value="all">All</option>
          <option value="images">Images</option>
          <option value="pdf">PDF</option>
          <option value="spreadsheet">Spreadsheet</option>
        </select>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto mt-2">

        {loading ? (
          <p className="text-center text-gray-400">Loading files...</p>
        ) : filteredFiles.length === 0 ? (
          <p className="text-center text-gray-400">No files found</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredFiles.map((file) => (
              <div
                key={file._id}
                className="bg-gray-800/70 backdrop-blur-lg p-5 rounded-2xl border border-gray-700 shadow-lg hover:scale-105 transition"
              >
                {/* Icon */}
                <div className="text-5xl text-center mb-3">
                  {getIcon(file.filename)}
                </div>

                {/* Name */}
                <p className="text-sm text-center truncate text-gray-300">
                  {file.filename}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500 text-center mt-1">
                  {new Date(file.uploadDate).toLocaleDateString()}
                </p>

                {/* Download */}
                <button
                  onClick={() => handleDownload(file.filename)}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg text-sm"
                >
                  ⬇ Download
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default FileList;