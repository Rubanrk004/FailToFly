import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressTracker = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ name: '', description: '', status: 'pending' });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/topics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      setTopics(data);
      prepareChartData(data);
    } catch (error) {
      console.error('Error fetching topics:', error.message);
    }
  };

  const prepareChartData = (data) => {
    const completed = data.filter(topic => topic.status === 'completed').length;
    const pending = data.filter(topic => topic.status === 'pending').length;

    setChartData({
      labels: ['Completed', 'Pending'],
      datasets: [
        {
          label: 'Topics',
          data: [completed, pending],
          backgroundColor: ['#4caf50', '#f44336'],
        },
      ],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTopic({ ...newTopic, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/topics', 
        newTopic, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedTopics = [...topics, response.data];
      setTopics(updatedTopics);
      setNewTopic({ name: '', description: '', status: 'pending' });
      prepareChartData(updatedTopics);
    } catch (error) {
      console.error('Error adding topic:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/topics/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedTopics = topics.filter(topic => topic._id !== id);
      setTopics(updatedTopics);
      prepareChartData(updatedTopics);
    } catch (error) {
      console.error('Error deleting topic:', error.message);
    }
  };

  return (
    <div className="bg-background bg-gradient-to-r from-green-400 to-blue-500/40 text-primary-foreground min-h-screen p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Progress Tracker</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Topic Name</label>
          <input
            type="text"
            name="name"
            value={newTopic.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={newTopic.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            name="status"
            value={newTopic.status}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Topic
        </button>
      </form>

      <div className="mb-6">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.length > 0 ? (
          topics.map(topic => (
            <div key={topic._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl text-black font-bold mb-2">{topic.name}</h3>
              <p className="text-gray-700 mb-3">{topic.description}</p>
              <p className="mb-3 text-gray-700" >
                Status: <span className={`font-bold ${topic.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{topic.status}</span>
              </p>
              <button
                onClick={() => handleDelete(topic._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No topics to display.</p>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
