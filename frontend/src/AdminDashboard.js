import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [resources, setResources] = useState([]);
  const [currentEndpoint, setCurrentEndpoint] = useState('coding'); // Default to 'coding'

  useEffect(() => {
    fetchResources();
  }, [currentEndpoint]);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/adminres/${currentEndpoint}`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };
  

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/adminres/${id}`);
  //     setResources(prevResources => prevResources.filter(resource => resource._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting resource:', error);
  //   }
  // };
  // const fetchResources = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/adminres');
  //     setResources(response.data);
  //   } catch (error) {
  //     console.error('Error fetching resources:', error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete resource with ID: ${id}`);
      const response = await axios.delete(`http://localhost:5000/adminres/${id}`);
      if (response.status === 200) {
        console.log(`Resource with ID: ${id} deleted successfully`);
        setResources(prevResources => prevResources.filter(resource => resource._id !== id));
      } else {
        console.error('Error deleting resource:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };
  
  

  return (
    <div className="bg-background text-primary-foreground min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-500 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold tracking-wider">Admin Dashboard</h1>
        <Link to="/" className="bg-primary-foreground text-primary hover:bg-primary/80 hover:text-primary-foreground px-4 py-2 rounded-full shadow-md transition duration-300">Go to Dashboard</Link>
      </header>

      <div className="flex justify-around py-4">
        <button onClick={() => setCurrentEndpoint('coding')} className="px-4 py-2 bg-blue-500 text-white rounded">Coding Practice</button>
        <button onClick={() => setCurrentEndpoint('behavioral-questions')} className="px-4 py-2 bg-blue-500 text-white rounded">Behavioral Questions</button>
        <button onClick={() => setCurrentEndpoint('company-research')} className="px-4 py-2 bg-blue-500 text-white rounded">Company Research</button>
        <button onClick={() => setCurrentEndpoint('roadmaps')} className="px-4 py-2 bg-blue-500 text-white rounded">Roadmaps</button>
      </div>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminForm title="Post Coding Practice" description="Add coding practice resources" endpoint="coding" fetchResources={fetchResources} />
        <AdminForm title="Post Behavioral Questions" description="Add behavioral questions resources" endpoint="behavioral-questions" fetchResources={fetchResources} />
        <AdminForm title="Post Company Research" description="Add company research resources" endpoint="company-research" fetchResources={fetchResources} />
        <AdminForm title="Post Roadmaps" description="Add roadmap resources" endpoint="roadmaps" fetchResources={fetchResources} />
      </main>

      <section className="p-6">
        <h2 className="text-3xl font-bold mb-4">Posted Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div key={resource._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">{resource.resourceTitle}</h3>
              <p className="text-gray-700 mb-4">{resource.resourceContent}</p>
              <a href={resource.resourceUrl} className="text-blue-500 hover:underline mb-2 block">View Resource</a>
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
    </div>
  );
};

const AdminForm = ({ title, description, endpoint, fetchResources }) => {
  const [formData, setFormData] = useState({
    resourceTitle: '',
    resourceUrl: '',
    resourceContent: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/adminres/${endpoint}`, formData);
      alert('Resource posted successfully:', response.data);
      fetchResources(); 
    } catch (error) {
      console.error('Error posting resource:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-black text-3xl font-bold mb-2">{title}</h2>
      <p className="text-green-600 mb-4">{description}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="resourceTitle" className="block text-sm text-black font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="resourceTitle"
            name="resourceTitle"
            value={formData.resourceTitle}
            onChange={handleChange}
            required
            className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resourceUrl" className="block text-sm text-black font-medium text-gray-700">URL</label>
          <input
            type="url"
            id="resourceUrl"
            name="resourceUrl"
            value={formData.resourceUrl}
            onChange={handleChange}
            required
            className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resourceContent" className="block text-sm text-black font-medium text-gray-700">Content</label>
          <textarea
            id="resourceContent"
            name="resourceContent"
            value={formData.resourceContent}
            onChange={handleChange}
            required
            className="w-full text-black px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-md transition duration-300">Post</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
