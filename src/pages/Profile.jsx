import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="bg-[#111111] rounded-lg p-6 space-y-6">
          {/* Profile Image Section */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-blue-600 flex items-center justify-center text-2xl">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              Change Avatar
            </button>
          </div>

          {/* Profile Details Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Username</label>
              <input 
                type="text" 
                defaultValue={user?.username}
                className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                // TODO: Add onChange handler for backend integration
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <input 
                type="email" 
                defaultValue={user?.email}
                className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                // TODO: Add onChange handler for backend integration
              />
            </div>
          </div>

          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            // TODO: Add onClick handler for backend integration
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
