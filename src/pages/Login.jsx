import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLoader } from 'react-icons/fi'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!credentials.username || !credentials.password) {
        throw new Error('Please enter both username and password')
      }

      // Here you can integrate with your backend API
      const response = await login(credentials)
      if (response.success) {
        navigate('/')
      } else {
        throw new Error(response.message || 'Invalid credentials')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-[#111111] p-8 rounded-xl shadow-2xl w-96 border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            ChartsAI
          </h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Username</label>
            <input
              type="text"
              className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition duration-200"
              placeholder="Enter your username"
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition duration-200"
              placeholder="Enter your password"
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] transition duration-200 flex items-center justify-center"
          >
            {isLoading ? <FiLoader className="animate-spin" size={20} /> : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-4 text-sm text-gray-400">
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-400">
            Forgot password?
          </Link>
          <div>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-400">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login