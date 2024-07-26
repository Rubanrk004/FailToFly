import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoadmapsPage = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get('https://failtofly-backend.onrender.com/adminres/roadmaps');
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    }
  };

  return (
    <div className="bg-background bg-gradient-to-r from-green-400 to-blue-500/40 text-primary-foreground min-h-screen p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Roadmaps</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map(roadmap => (
          <div key={roadmap._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
             <img src="roadmap.jpg" alt="" />
            <h3 className="text-2xl text-black font-bold mb-2">{roadmap.resourceTitle}</h3>
            <p className="text-black mb-4">{roadmap.resourceContent}</p>
            <a href={roadmap.resourceUrl} className="text-blue-500 hover:underline mb-2 block">Explore</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapsPage;
