import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!credentials.username || !credentials.password) {
        throw new Error('Please enter both username and password');
      }

      const response = await login(credentials);
      if (response.success) {
        navigate('/');
      } else {
        throw new Error(response.message || 'Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-satoshi relative">
      {/* Left Section */}
      <div className="flex-1 bg-[#666FE4] flex items-center justify-center">
        <img
          src="/assets/left.png"
          alt="Left Side Graphic"
          className="w-[220px] h-auto"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-[500px] px-12 py-14 bg-white rounded-lg">
          <div className="flex flex-col items-start mb-[23px]">
            <img src="/assets/logo.png" alt="Logo" className="w-[182px] h-[42px] mb-6" />
            <h2 className="text-[32px] font-normal text-gray-800">Sign in</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8 w-full">
            <div className="w-full">
              <label htmlFor="username" className="block text-[18px] font-normal text-gray-600">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="mt-2 block w-[334px] h-[60px] px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#666FE4] focus:border-[#666FE4] text-[16px]"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="block text-[18px] font-normal text-gray-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-2 block w-[334px] h-[60px] px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#666FE4] focus:border-[#666FE4] text-[16px]"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-[334px] h-[78px] flex justify-center items-center border border-transparent rounded-md shadow-sm text-[18px] font-normal text-white bg-[#666FE4] hover:bg-[#5b5fc7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#666FE4]"
            >
              {isLoading ? 'Loading...' : 'Sign in'}
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;