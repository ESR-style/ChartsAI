import React, { useState } from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import ProfileMenu from './ProfileMenu.jsx'

const TopBar = ({ toggleSidebar, isCollapsed, onOpenProfile, onOpenSettings }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user } = useAuth()
  
  return (
    <div className="h-16 bg-white border-b border-gray-200 
      flex items-center justify-between px-6 relative z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-700 
            transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <HiMenuAlt2 size={22} />
        </button>
      </div>
      
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <img src="/assets/logo.png" alt="Charts AI Logo" className="h-auto" style={{ width: "140px", height: "32px" }} />
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-blue-600 text-sm font-medium">{user?.username || 'User'}</span>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-10 h-10 rounded-full bg-gray-200 
            flex items-center justify-center text-gray-800 cursor-pointer hover:shadow-lg 
            transition-all duration-200 font-semibold
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