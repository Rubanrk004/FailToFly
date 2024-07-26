import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBell, FaBook, FaCode, FaQuestion, FaFileAlt, FaRobot, FaChartLine, FaBuilding, FaMapSigns } from 'react-icons/fa';

const LandingPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/messages', formData);
      alert('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <div className="font-sans">
     <div className="bg-gradient-to-r from-green-400 to-blue-500/40 p-8 text-white text-center flex flex-col items-center">
  <img src="finallogos.png" alt="FailToFly Logo" className="mb-4 w-32 h-13 zoom-animation" />
  <h1 className="text-5xl font-bold mb-4">Welcome to FailToFly</h1>
  <div className="space-x-4">
    <Link to="/signup">
      <button className="bg-white text-blue-500 px-6 py-2 rounded-md hover:bg-gray-200">Get Started</button>
    </Link>
    <Link to="/signin">
      <button className="bg-white text-blue-500 px-6 py-2 rounded-md hover:bg-gray-200">Sign In</button>
    </Link>
  </div>
  </div>


      <main className="py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-8">
          <div className="bg-gradient-to-r from-pink-300 to-yellow-300 p-6 rounded-lg shadow-md text-center">
            <FaCalendarAlt size={50} className="text-blue-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Study Planner</h3>
          </div>
          <div className="bg-gradient-to-r from-green-300 to-blue-300 p-6 rounded-lg shadow-md text-center">
            <FaBell size={50} className="text-yellow-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Reminders</h3>
          </div>
          <div className="bg-gradient-to-r from-purple-300 to-red-300 p-6 rounded-lg shadow-md text-center">
            <FaBook size={50} className="text-green-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Resources</h3>
          </div>
          <div className="bg-gradient-to-r from-yellow-300 to-pink-300 p-6 rounded-lg shadow-md text-center">
            <FaCode size={50} className="text-red-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Coding Questions</h3>
          </div>
          <div className="bg-gradient-to-r from-blue-300 to-green-300 p-6 rounded-lg shadow-md text-center">
            <FaQuestion size={50} className="text-purple-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Behavioral Questions</h3>
          </div>
          <div className="bg-gradient-to-r from-red-300 to-purple-300 p-6 rounded-lg shadow-md text-center">
            <FaFileAlt size={50} className="text-indigo-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Resume Templates</h3>
          </div>
          {/* <div className="bg-gradient-to-r from-pink-300 to-yellow-300 p-6 rounded-lg shadow-md text-center">
            <FaRobot size={50} className="text-pink-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Chat Assistant</h3>
          </div> */}
          <div className="bg-gradient-to-r from-green-300 to-blue-300 p-6 rounded-lg shadow-md text-center">
            <FaChartLine size={50} className="text-teal-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Progress Tracker</h3>
          </div>
          <div className="bg-gradient-to-r from-purple-300 to-red-300 p-6 rounded-lg shadow-md text-center">
            <FaBuilding size={50} className="text-orange-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Company Research</h3>
          </div>
          <div className="bg-gradient-to-r from-yellow-300 to-pink-300 p-6 rounded-lg shadow-md text-center">
            <FaMapSigns size={50} className="text-gray-500 mb-4 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">Roadmap</h3>
          </div>
        </section>
        <section className="bg-gradient-to-r from-green-400 to-blue-500/40 p-8 rounded-md shadow-md text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-medium">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="px-4 py-2 text-black rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-medium">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="px-4 py-2 text-black rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 font-medium">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="px-4 py-2 text-black rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-white" rows="4"></textarea>
            </div>
            <button type="submit" className="bg-white text-green-500 px-6 py-2 rounded-md hover:bg-gray-200">Submit</button>
          </form>
        </section>
      </main>
      <footer className="py-6 text-center text-white bg-black bg-opacity-50">
        <p>&copy; 2024 FailToFly. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://twitter.com/failtofly" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-purple-300 transition duration-300">Twitter</a>
          <a href="https://facebook.com/failtofly" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-purple-300 transition duration-300">Facebook</a>
          <a href="https://linkedin.com/company/failtofly" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-purple-300 transition duration-300">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
