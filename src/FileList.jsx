import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Download, FileText, Image, FileSpreadsheet, FileArchive, File } from "lucide-react";
import { motion } from "framer-motion";

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
      const response = await axios.get("https://panda-files.onrender.com/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };
 const handleDownload = async (filename) => {
    try {
      const { data } = await axios.get(`https://panda-files.onrender.com/files/${filename}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const getFileIcon = (filename) => {
    const iconProps = { size: 20, className: "text-gray-900 text-white" };
    if (/\.(jpg|jpeg|png|gif|svg)$/i.test(filename)) return <Image {...iconProps} />;
    if (/\.pdf$/i.test(filename)) return <FileText {...iconProps} />;
    if (/\.(xlsx|xls|csv)$/i.test(filename)) return <FileSpreadsheet {...iconProps} />;
    if (/\.(zip|rar|tar)$/i.test(filename)) return <FileArchive {...iconProps} />;
    return <File {...iconProps} />;
  };

  const filteredFiles = useMemo(() => {
    return files
      .filter((file) => file.filename.toLowerCase().includes(search.toLowerCase()))
      .filter((file) => {
        if (fileType === "all") return true;
        if (fileType === "images") return /\.(jpg|jpeg|png|gif|svg)$/i.test(file.filename);
        if (fileType === "pdf") return /\.pdf$/i.test(file.filename);
        if (fileType === "text") return /\.txt$/i.test(file.filename);
        if (fileType === "spreadsheet") return /\.(xlsx|xls|csv)$/i.test(file.filename);
        return false;
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
   <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 bg-gray-900">
  <h1 className="text-2xl font-bold text-gray-800 text-gray-200 mb-4">Your Uploaded Files</h1>


      <input
        type="text"
        placeholder="Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-lg p-2 border rounded-md shadow-md :bg-gray-800 text-white mb-4"
      />

      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <motion.select
          whileHover={{ scale: 1.05 }}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg bg-gray-200  bg-gray-700 cursor-pointer text-gray-900  text-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </motion.select>

        <motion.select
          whileHover={{ scale: 1.05 }}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg bg-gray-200  bg-gray-700 cursor-pointer text-gray-900  text-white"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="all">All Files</option>
          <option value="images">Images</option>
          <option value="pdf">PDFs</option>
          <option value="text">Text Files</option>
          <option value="spreadsheet">Spreadsheets</option>
        </motion.select>
      </div>

      {loading ? (
        <p className="text-gray-700  text-white text-center">Loading files...</p>
      ) : filteredFiles.length === 0 ? (
        <p className="text-gray-700  text-white text-center">No files found.</p>
      ) : (
        <ul className="w-full max-w-lg bg-white  bg-gray-800 shadow-lg rounded-lg p-4">
          {filteredFiles.map((file) => (
            <li key={file._id} className="flex justify-between items-center p-2 border-b  border-gray-600">
              <div className="flex items-center gap-3">
                {getFileIcon(file.filename)}
                <span className="text-gray-700  text-gray-300">{file.filename}</span>
              </div>
              <button className="hover:text-blue-500" onClick={() => handleDownload(file.filename)}>
                  <Download size={20} />
                </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
