import React from 'react';
import { Link } from 'react-router-dom';

const AptitudeLearning = () => {
  return (
    <div className="p-6 bg-gray-100 bg-gradient-to-r from-green-400 to-blue-500/40 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Aptitude Learning</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Box Container */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gradient-to-r from-green-400 to-blue-500/40">
          {/* Logical Reasoning Box */}
          <Link to="/aptitude/logic">
            <div className="flex flex-col h-full bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition ease-in-out duration-300 bg-gradient-to-r from-green-400 to-blue-500/40">
              <h2 className="text-2xl font-semibold text-center mb-4">Logical Reasoning</h2>
              <p className="text-gray-600 text-center">
                Explore various logical reasoning questions and enhance your skills.
              </p>
            </div>
          </Link>
        </div>

        {/* Numerical Aptitude Box */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <Link to="/aptitude/numerical">
            <div className="flex flex-col h-full bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition ease-in-out duration-300 bg-gradient-to-r from-green-400 to-blue-500/40">
              <h2 className="text-2xl font-semibold text-center mb-4">Numerical Aptitude</h2>
              <p className="text-gray-600 text-center">
                Solve numerical aptitude questions to improve your calculation skills.
              </p>
            </div>
          </Link>
        </div>

        {/* Verbal Ability Box */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <Link to="/aptitude/verbal">
            <div className="flex flex-col h-full bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition ease-in-out duration-300 bg-gradient-to-r from-green-400 to-blue-500/40">
              <h2 className="text-2xl font-semibold text-center mb-4">Verbal Ability</h2>
              <p className="text-gray-600 text-center">
                Test your verbal ability with various questions to enhance your language skills.
              </p>
            </div>
          </Link>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <Link to="/aptitude/verbal">
            <div className="flex flex-col h-full bg-white p-6 border border-white rounded-lg shadow-lg hover:bg-gray-50 transition ease-in-out duration-300 bg-gradient-to-r from-green-400 to-blue-500/40">
              <h2 className="text-2xl font-semibold text-center mb-4">Verbal Ability</h2>
              <p className="text-white text-center">
                Test your verbal ability with various questions to enhance your language skills.
              </p>
            </div>
          </Link>
        </div>

        {/* Add more headings/topics here */}
      </div>
    </div>
  );
};

export default AptitudeLearning;
