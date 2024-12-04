import React from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'

const TopBar = ({ toggleSidebar, isCollapsed }) => {
  const { user } = useAuth()
  
  return (
    <div className="h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-900 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <HiMenuAlt2 size={20} />
        </button>
        <h1 className="text-white text-lg font-bold">ChartsAI</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">{user?.username || 'User'}</span>
        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white cursor-pointer hover:bg-gray-700 transition-colors">
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </div>
  )
}

export default TopBar