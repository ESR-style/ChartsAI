import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { BiMessageSquare, BiPlus } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'

const ChatSidebar = ({ chats, activeChat, onChatSelect, isCollapsed }) => {
  const { logout } = useAuth()

  return (
    <div className={`${isCollapsed ? 'w-0' : 'w-80'} bg-gray-900 text-gray-300 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden transition-all duration-300`}>
      <div className="p-2 flex flex-col h-full">
        <button
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors w-full mb-4"
          onClick={() => onChatSelect(null)}
        >
          <BiPlus size={20} />
          <span>New Chat</span>
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 flex items-center gap-3 ${
                activeChat === chat.id ? 'bg-gray-800 border border-gray-700' : ''
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <BiMessageSquare size={18} />
              <span className="truncate">{chat.title}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4">
          <button
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-gray-400 hover:text-white"
            onClick={logout}
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar