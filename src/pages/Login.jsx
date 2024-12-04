import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(credentials)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">ChartsAI</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login