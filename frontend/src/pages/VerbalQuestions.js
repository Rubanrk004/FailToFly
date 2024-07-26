import React from 'react';

const VerbalQuestions = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500/40">
      <h1 className="text-3xl font-bold mb-6">Verbal Ability</h1>
      <div className="space-y-4">
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 1</h2>
          <p>Complete the analogy: Book is to Reading as Fork is to ?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              The answer is Eating. A book is used for reading, and a fork is used for eating.
            </p>
          </div>
        </div>
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 2</h2>
          <p>What is the synonym of "Abundant"?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              The synonym of "Abundant" is "Plentiful". Both words describe a large quantity or amount of something.
            </p>
          </div>
        </div>
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 2</h2>
          <p>What is the synonym of "Abundant"?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              The synonym of "Abundant" is "Plentiful". Both words describe a large quantity or amount of something.
            </p>
          </div>
        </div>
        {/* Add more questions and answers as needed */}
      </div>
    </div>
  );
};

export default VerbalQuestions;
