
import React from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'

const TopBar = ({ toggleSidebar, isCollapsed }) => {
  const { user } = useAuth()
  
  return (
    <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-md text-gray-300 hover:text-white"
        >
          <HiMenuAlt2 size={20} />
        </button>
        <h1 className="text-white text-lg font-semibold">ChartsAI</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-gray-300 text-sm">{user?.username || 'User'}</span>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white cursor-pointer hover:bg-gray-500">
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </div>
  )
}

export default TopBar