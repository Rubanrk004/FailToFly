import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoadmapDetailPage = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    axios.get(`https://failtofly-backend.onrender.com/roadmaps/${id}`)
      .then(response => setRoadmap(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!roadmap) return <div>Loading...</div>;

  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500/40'>
      <h1 className="text-4xl font-bold">{roadmap.title}</h1>
      <p>{roadmap.description}</p>
      <ul>
        {roadmap.steps.map((step, index) => (
          <li key={index} className={`my-2 ${step.completed ? 'text-green-600' : 'text-red-600'}`}>
            <h3 className="text-2xl">{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapDetailPage;
