import React from 'react'
import { useAuth } from '../context/AuthContext'

const Settings = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-[#111111] rounded-lg p-6 space-y-6">
          {/* Preferences Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-checkbox bg-gray-800 rounded"
                  // TODO: Add onChange handler for backend integration
                />
                <span>Enable notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-checkbox bg-gray-800 rounded"
                  // TODO: Add onChange handler for backend integration
                />
                <span>Dark mode</span>
              </label>
            </div>
          </div>

          {/* Plan Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-lg font-medium">{user?.plan || 'Free'} Plan</div>
              <p className="text-gray-400 text-sm mt-1">
                {user?.plan === 'Premium' ? 'Unlimited access to all features' : 'Upgrade to Premium for more features'}
              </p>
            </div>
          </div>

          <button 
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            // TODO: Add onClick handler for backend integration
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
