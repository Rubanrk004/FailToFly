import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResourcePage = () => {
  const { endpoint } = useParams();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`https://failtofly-backend.onrender.com/adminres/${endpoint}`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, [endpoint]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500/40 bg-background text-primary-foreground p-6">
      <h1 className="text-3xl font-bold mb-4">{endpoint.replace('-', ' ').toUpperCase()}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <h2 className="text-black text-2xl font-bold mb-2">{resource.resourceTitle}</h2>
            <p className="text-green-600 mb-2">{resource.resourceUrl}</p>
            <p className="text-black">{resource.resourceContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePage;
