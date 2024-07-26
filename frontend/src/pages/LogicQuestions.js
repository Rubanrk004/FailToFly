import React from 'react';

const LogicQuestions = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500/40">
      <h1 className="text-3xl font-bold mb-6">Logical Reasoning</h1>
      <div className="space-y-4">
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 1</h2>
          <p>What is the next number in the series 2, 6, 12, 20?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              The answer is 30. The pattern in the series is that the difference between consecutive terms increases by 2.
              - Difference between 6 and 2 is 4
              - Difference between 12 and 6 is 6
              - Difference between 20 and 12 is 8
              Hence, the next difference should be 10, so 20 + 10 = 30.
            </p>
          </div>
        </div>
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 2</h2>
          <p>If A is older than B and B is older than C, who is the youngest?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              C is the youngest. Given that A is older than B and B is older than C, it follows that C must be the youngest of the three.
            </p>
          </div>
        </div>
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 2</h2>
          <p>If A is older than B and B is older than C, who is the youngest?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              C is the youngest. Given that A is older than B and B is older than C, it follows that C must be the youngest of the three.
            </p>
          </div>
        </div>
        {/* Add more questions and answers as needed */}
      </div>
    </div>
  );
};

export default LogicQuestions;
