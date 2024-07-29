import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get('https://failtofly-chatbot.onrender.com/chatbot/history');
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await axios.post('https://failtofly-chatbot.onrender.com/chatbot', { message: newMessage });
      setMessages([...messages, response.data]);
      setNewMessage(''); 
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const clearChat = async () => {
    try {
      await axios.delete('https://failtofly-chatbot.onrender.com/chatbot/history');
      setMessages([]);
    } catch (err) {
      console.error('Error clearing chat history:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg bg-gradient-to-r from-green-400 to-blue-500/40 shadow-md text-center">
      <div className="chatbox border p-4 rounded-md mb-4 max-h-60 overflow-y-auto ">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="text-blue-500"><strong>User:</strong> {msg.user}</div>
            <div className="text-green-500"><strong>Bot:</strong> {msg.bot}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 text-black border rounded-l-md"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </div>
      <button
        onClick={clearChat}
        className="bg-red-500 text-white px-4 py-2 rounded-md text-center"
      >
        Clear Chat
      </button>
    </div>
  );
};

export default ChatInterface;
