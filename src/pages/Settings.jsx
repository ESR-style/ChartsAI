import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FiBell, FiMoon, FiGlobe, FiShield, FiCreditCard } from 'react-icons/fi'

const Settings = () => {
  const { user } = useAuth()

  const SettingSection = ({ icon: Icon, title, children }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Icon className="text-blue-500" />
        <h2>{title}</h2>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-[#111111] rounded-lg p-6 space-y-8">
          <SettingSection icon={FiBell} title="Notifications">
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg group hover:bg-gray-800/50 transition-colors">
                <div className="space-y-1">
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-gray-400">Get notified about new messages</div>
                </div>
                <input type="checkbox" className="form-checkbox bg-gray-800 rounded" />
              </label>
              <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg group hover:bg-gray-800/50 transition-colors">
                <div className="space-y-1">
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive email updates</div>
                </div>
                <input type="checkbox" className="form-checkbox bg-gray-800 rounded" />
              </label>
            </div>
          </SettingSection>

          <SettingSection icon={FiMoon} title="Appearance">
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg group hover:bg-gray-800/50 transition-colors">
                <div className="space-y-1">
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-gray-400">Toggle dark/light theme</div>
                </div>
                <input type="checkbox" className="form-checkbox bg-gray-800 rounded" defaultChecked />
              </label>
            </div>
          </SettingSection>

          <SettingSection icon={FiCreditCard} title="Subscription">
            <div className="bg-gray-800/30 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-medium">{user?.plan || 'Free'} Plan</div>
                  <p className="text-gray-400 text-sm">
                    {user?.plan === 'Premium' ? 'Unlimited access to all features' : 'Basic features'}
                  </p>
                </div>
                {user?.plan !== 'Premium' && (
                  <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          </SettingSection>

          <div className="pt-4 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
