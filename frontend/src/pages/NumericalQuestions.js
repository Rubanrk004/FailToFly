import React from 'react';

const NumericalQuestions = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500/40">
      <h1 className="text-3xl font-bold mb-6">Numerical Aptitude</h1>
      <div className="space-y-4">
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 1</h2>
          <p>What is 15% of 200?</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              The answer is 30. To find 15% of 200:
              <br />
              15% can be written as 0.15.
              <br />
              Multiply 200 by 0.15: 200 × 0.15 = 30.
            </p>
          </div>
        </div>
        <div className="p-4 border border-white rounded-lg shadow-md bg-white bg-gradient-to-r from-green-400 to-blue-500/40">
          <h2 className="text-xl font-semibold mb-2">Question 2</h2>
          <p>Solve for x: 2x + 3 = 11</p>
          <div className="mt-4 p-4 border-t border-white">
            <h3 className="text-lg font-semibold">Answer:</h3>
            <p>
              Solving for x:
              <br />
              Subtract 3 from both sides: 2x = 8
              <br />
              Divide both sides by 2: x = 4
            </p>
          </div>
        </div>
        {/* Add more questions and answers as needed */}
      </div>
    </div>
  );
};

export default NumericalQuestions;
