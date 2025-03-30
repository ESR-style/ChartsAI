import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLoader } from 'react-icons/fi'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error('Please fill in all fields')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Temporary: Just redirect to login
      setTimeout(() => {
        navigate('/login')
      }, 1500)
      
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-[#5b5fc7] flex items-center justify-center relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg width="259" height="181" viewBox="0 0 259 181" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M211.816 0.000106812L211.816 180.486L258.6 180.486L258.6 0.000104767L211.816 0.000106812Z" fill="white"/>
          <path d="M52.9133 6.08232L19.8203 39.1753L114.325 133.68L0.0473612 133.68L0.0473633 180.485L180.533 180.485L180.533 133.68L180.511 133.68L52.9133 6.08232Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <img src="/assets/veritaz-logo.svg" alt="Veritaz AI Logo" className="w-40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Username</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-100 border border-[#666FE4] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#666FE4]"
                placeholder="Choose a username"
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-gray-100 border border-[#666FE4] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#666FE4]"
                placeholder="Enter your email"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 border border-[#666FE4] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#666FE4]"
                placeholder="Create a password"
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 border border-[#666FE4] rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#666FE4]"
                placeholder="Confirm your password"
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#666FE4] text-white p-3 rounded-lg font-medium hover:bg-[#5b5fc7] focus:outline-none focus:ring-2 focus:ring-[#666FE4] flex items-center justify-center"
            >
              {isLoading ? <FiLoader className="animate-spin" size={20} /> : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register