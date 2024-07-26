import React, { useState } from "react";
import axios from "axios";

const AdminUploadPage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      await axios.post("https://failtofly-backend.onrender.com/api/upload-template", formData);
      alert("Template uploaded successfully");
    } catch (error) {
      console.error("Error uploading template", error);
      alert("Error uploading template: " + error.message); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-indigo-500/50 p-4">
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Resume Template</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Template Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Template File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminUploadPage;
