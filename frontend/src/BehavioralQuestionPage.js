import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BehavioralQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchBehavioralQuestions();
  }, []);

  const fetchBehavioralQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/adminres/behavioral-questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching behavioral questions:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500/40">
      <h1 className="text-4xl font-bold mb-4">Behavioral Questions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {questions.map(question => (
          <div key={question._id} className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500/40">
            <img src="./bquestions.jpg" alt="behavioral-questions" className="w-full h-40 object-cover rounded-lg mb-3" />
            <h2 className="text-2xl font-bold mb-2">{question.resourceTitle}</h2>
            <p className="text-gray-700 mb-4">{question.resourceContent}</p>
            <a href={question.resourceUrl} className="text-blue-500 hover:underline">Practice Questions</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BehavioralQuestionsPage;
