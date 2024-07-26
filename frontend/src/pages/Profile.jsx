import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); 
        const res = await axios.get('https://failtofly-backend.onrender.com/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User data:', res.data); 
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user data:', err); 
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500/40 ">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Profile</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Name</label>
          <p className="mt-1 p-3 border border-gray-300 rounded w-full">{user.name || 'N/A'}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <p className="mt-1 p-3 border border-gray-300 rounded w-full">{user.email || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
