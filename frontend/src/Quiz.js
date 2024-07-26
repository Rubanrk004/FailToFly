import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [userResponses, setUserResponses] = useState({});
    const [answers, setAnswers] = useState(null);
    const [userInfo, setUserInfo] = useState({ name: '', email: '' });

    useEffect(() => {
        axios.get('https://failtofly-backend.onrender.com/api/quiz')
            .then(response => setQuizData(response.data))
            .catch(error => console.error('Error fetching quiz data:', error));
    }, []);

    const handleChange = (e, questionId) => {
        setUserResponses({
            ...userResponses,
            [questionId]: e.target.value,
        });
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        // Check if all questions have been answered
        const allAnswered = quizData.every(question => userResponses.hasOwnProperty(question.id));

        if (!allAnswered) {
            alert('Please answer all questions before submitting the quiz.');
            return;
        }

        const submissionData = {
            userInfo,
            responses: userResponses,
        };

        axios.post('http://localhost:5000/api/quiz/submit', submissionData)
            .then(response => setAnswers(response.data.answers))
            .catch(error => console.error('Error submitting quiz:', error));
    };

    return (
        <div className="p-4 max-full mx-auto bg-gradient-to-r from-green-400 to-blue-500/40">
            <h1 className="text-2xl font-bold mb-4">Oops Quiz</h1>

            <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
    <p><strong>Warning:</strong> Avoid refreshing the page before submitting your answers, as it will erase all your responses.</p>
</div>


            <div className="space-y-4">
                {quizData.map((question) => (
                    <div key={question.id} className="p-4 border border-gray-300 rounded-md shadow-md">
                        <p className="font-semibold text-lg mb-2">{question.question}</p>
                        {question.options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    id={`question-${question.id}-option-${index}`}
                                    name={`question-${question.id}`}
                                    value={option}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`question-${question.id}-option-${index}`} className="text-gray-700">{option}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
            {answers && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
                    {answers.map((answer, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-md shadow-md mb-4">
                            <p className="font-semibold mb-2">Question: {answer.question}</p>
                            <p className="mb-1">Your Answer: {answer.userAnswer}</p>
                            <p className="mb-1">Correct Answer: {answer.correctAnswer}</p>
                            <p className={`font-semibold ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {answer.isCorrect ? "Correct" : "Incorrect"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;
