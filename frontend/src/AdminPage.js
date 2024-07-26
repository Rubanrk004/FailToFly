import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/messages/${id}`);
      setMessages(messages.filter(message => message._id !== id));
    } catch (error) {
      console.error('Error deleting message', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
      <header className="flex justify-between items-center p-6 bg-white bg-opacity-80 shadow-md">
        <div className="flex items-center justify-center flex-1 space-x-4">
          <img src="./finallogos.png" alt="FailToFly Logo" className="h-12 w-13 zoom-animation" />
          <div>
            <h1 className="text-3xl font-bold text-dark-gray">FailToFly</h1>
            <h2 className="text-xl font-semibold text-dark-gray mt-0">Rise Above Failures</h2>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <section className="p-10 bg-gray-100">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-4xl font-semibold text-center mb-10">Admin Messages</h3>
            {messages.length > 0 ? (
              <ul className="space-y-4">
                {messages.map((message) => (
                  <li key={message._id} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
                    <div>
                      <h4 className="text-2xl font-semibold">{message.name}</h4>
                      <p className="text-lg">{message.email}</p>
                      <p className="text-lg">{message.message}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-center">No messages found</p>
            )}
          </div>
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
};

export default AdminPage;
