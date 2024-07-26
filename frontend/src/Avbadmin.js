import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminResourcePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    content: '',
    type: 'article'
  });

  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/avbadmin/${formData.type}`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/avbadmin', formData);
      alert('Resource posted successfully:', response.data);
      fetchResources();
    } catch (error) {
      console.error('Error posting resource:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/avbadmin/${id}`);
      setResources(resources.filter(resource => resource._id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="bg-background text-primary-foreground min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-500 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold tracking-wider">Admin Resource Page</h1>
        <Link to="/" className="bg-primary-foreground text-primary hover:bg-primary/80 hover:text-primary-foreground px-4 py-2 rounded-full shadow-md transition duration-300">Go to Dashboard</Link>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-black text-3xl font-bold mb-2">Post a Resource</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm text-black font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="book">Book</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm text-black font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm text-black font-medium text-gray-700">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm text-black font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <button type="submit" className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300">Post</button>
          </form>
        </div>

        <section>
          <h2 className="text-3xl font-bold mb-4">Posted Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <div key={resource._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-700 mb-4">{resource.content}</p>
                <a href={resource.url} className="text-blue-500 hover:underline mb-2 block">View Resource</a>
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminResourcePage;
