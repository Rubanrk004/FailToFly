import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CodingPracticePage = () => {
  const [codingResources, setCodingResources] = useState([]);

  useEffect(() => {
    fetchCodingResources();
  }, []);

  const fetchCodingResources = async () => {
    try {
      const response = await axios.get('http://localhost:5000/adminres/coding');
      setCodingResources(response.data);
    } catch (error) {
      console.error('Error fetching coding resources:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500/40">
      <h1 className="text-4xl font-bold mb-4">Coding Practice Resources</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {codingResources.map(resource => (
          <div key={resource._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <img src="./codingimage.png" alt="coding-practice" className="w-full h-40 object-cover rounded-lg mb-3" />
            <h2 className="text-2xl font-bold mb-2">{resource.resourceTitle}</h2>
            <p className="text-gray-700 mb-4">{resource.resourceContent}</p>
            <a href={resource.resourceUrl} className="text-blue-500 hover:underline">Practice Now</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingPracticePage;
