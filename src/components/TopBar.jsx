import React, { useState } from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import ProfileMenu from './ProfileMenu.jsx'

const TopBar = ({ toggleSidebar, isCollapsed, onOpenProfile, onOpenSettings }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user } = useAuth()
  
  return (
    <div className="h-16 bg-[#161616]/95 backdrop-blur-lg border-b border-white/10 
      flex items-center justify-between px-6 relative z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 hover:text-gray-200 
            transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <HiMenuAlt2 size={22} />
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 
          bg-clip-text text-transparent tracking-tight">
          ChartsAI
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-indigo-300 text-sm font-medium">{user?.username || 'User'}</span>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 
            flex items-center justify-center text-white cursor-pointer hover:shadow-lg 
            hover:shadow-indigo-500/20 transition-all duration-200 font-semibold
            active:scale-95"
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