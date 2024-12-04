import React, { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'

const ProfileMenu = ({ isOpen, onClose, onOpenProfile, onOpenSettings }) => {
  const { user, logout } = useAuth()
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div ref={menuRef} className="absolute right-0 top-14 w-64 bg-[#111111] border border-gray-800 rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-medium">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-white font-medium">{user?.username}</div>
            <div className="text-sm text-gray-400">{user?.plan} plan</div>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        <button onClick={() => { onClose(); onOpenProfile(); }} 
          className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all">
          <FiUser size={18} />
          <span>Profile</span>
        </button>
        <button onClick={() => { onClose(); onOpenSettings(); }}
          className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all">
          <FiSettings size={18} />
          <span>Settings</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileMenu
