import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AdminLogin from '../AdminLogin'; // Ensure you have this import

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      console.log(res.data);
      // Store the token and user information
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Invalid Credentials")
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-r from-green-400 to-blue-500/40 justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl flex items-start">
        <div className="w-1/2 pr-4 border-r">
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="w-1/2 pr-4">
          <AdminLogin />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
