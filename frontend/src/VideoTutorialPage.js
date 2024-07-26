import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoTutorialPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://failtofly-backend.onrender.com/avbadmin/video');
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="bg-background bg-gradient-to-r from-green-400 to-blue-500/40 text-primary-foreground min-h-screen p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Video Tutorials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <h3 className="text-2xl text-black font-bold mb-2">{video.title}</h3>
            <p className="text-gray-700 mb-4">{video.content}</p>
            <a href={video.url} className="text-blue-500 hover:underline mb-2 block">Watch Video</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTutorialPage;
