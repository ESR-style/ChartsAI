import React, { useState } from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import ProfileMenu from './ProfileMenu.jsx'

const TopBar = ({ toggleSidebar, isCollapsed, onOpenProfile, onOpenSettings }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user } = useAuth()
  
  return (
    <div className="h-14 bg-[#0a0a0a] border-b border-gray-800/50 flex items-center justify-between px-4 relative">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-800/50 rounded-lg text-gray-400 hover:text-white transition-all"
        >
          <HiMenuAlt2 size={20} />
        </button>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 text-lg font-bold">
          ChartsAI
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">{user?.username || 'User'}</span>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-8 h-8 rounded-lg bg-gray-800/70 flex items-center justify-center text-white cursor-pointer hover:bg-gray-700 transition-all"
        >
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </button>
        <ProfileMenu 
          isOpen={isProfileMenuOpen} 
          onClose={() => setIsProfileMenuOpen(false)}
          onOpenProfile={onOpenProfile}
          onOpenSettings={onOpenSettings}
        />
      </div>
    </div>
  )
}

export default TopBar