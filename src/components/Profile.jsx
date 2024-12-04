import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FiCamera, FiKey, FiShield, FiAlertCircle } from 'react-icons/fi'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-lg bg-blue-600 flex items-center justify-center text-3xl font-medium">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <FiCamera size={16} />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.username}</h2>
          <p className="text-gray-400">Member since {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Username</label>
            <input 
              type="text" 
              defaultValue={user?.username}
              disabled={!isEditing}
              className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 focus:border-blue-500 transition-colors disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <input 
              type="email" 
              defaultValue={user?.email}
              disabled={!isEditing}
              className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 focus:border-blue-500 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          
          {isEditing && (
            <button className="w-full p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Security Section */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiShield className="text-blue-500" />
          <span>Security</span>
        </h3>
        <button className="w-full p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-left flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-medium">Change Password</div>
            <div className="text-sm text-gray-400">Update your password</div>
          </div>
          <FiKey className="text-gray-400" />
        </button>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-gray-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-500">
          <FiAlertCircle />
          <span>Danger Zone</span>
        </h3>
        <button className="w-full p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default Profile