import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { BiMessageSquare, BiPlus, BiDotsVerticalRounded } from 'react-icons/bi'
import { FiLogOut, FiTrash2, FiArchive, FiShare2, FiEdit } from 'react-icons/fi'

const ChatSidebar = ({ chats, activeChat, onChatSelect, isCollapsed, onDeleteChat }) => {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(null)

  // TODO: Implement these handlers for backend integration
  const handleArchive = (chatId) => {
    console.log('Archive chat:', chatId)
    setMenuOpen(null)
  }

  const handleShare = (chatId) => {
    console.log('Share chat:', chatId)
    setMenuOpen(null)
  }

  const handleRename = (chatId) => {
    console.log('Rename chat:', chatId)
    setMenuOpen(null)
  }

  const ChatOptionsMenu = ({ chatId }) => (
    <div className="absolute right-0 top-full mt-1 w-48 bg-[#111111] border border-gray-800 rounded-lg shadow-xl z-50">
      <div className="py-1">
        <button
          onClick={() => handleRename(chatId)}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <FiEdit size={16} />
          <span>Rename</span>
        </button>
        <button
          onClick={() => handleArchive(chatId)}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <FiArchive size={16} />
          <span>Archive</span>
        </button>
        <button
          onClick={() => handleShare(chatId)}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <FiShare2 size={16} />
          <span>Share</span>
        </button>
        <button
          onClick={() => {
            onDeleteChat(chatId);
            setMenuOpen(null);
          }}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-gray-800/50"
        >
          <FiTrash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className={`${isCollapsed ? 'w-0' : 'w-80'} bg-[#111111] text-gray-300 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden transition-all duration-300`}>
      <div className="p-2 flex flex-col h-full">
        <button
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 hover:bg-gray-800/50 transition-colors w-full mb-4 group"
          onClick={() => onChatSelect(null)}
        >
          <BiPlus size={20} className="text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-gray-300 group-hover:text-white transition-colors">New Chat</span>
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-800">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`group p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 relative
                ${activeChat === chat.id 
                  ? 'bg-gray-800/70 text-white' 
                  : 'hover:bg-gray-800/40 text-gray-400 hover:text-gray-200'}`}
            >
              <div className="flex-1 flex items-center gap-3" onClick={() => onChatSelect(chat.id)}>
                <BiMessageSquare size={18} className="group-hover:text-gray-200 transition-colors" />
                <span className="truncate">{chat.title}</span>
              </div>
              <button
                onClick={() => setMenuOpen(menuOpen === chat.id ? null : chat.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
              >
                <BiDotsVerticalRounded size={18} />
              </button>
              {menuOpen === chat.id && <ChatOptionsMenu chatId={chat.id} />}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800/50 pt-4 mt-4">
          <button
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all w-full text-gray-400 hover:text-white group"
            onClick={logout}
          >
            <FiLogOut size={20} className="group-hover:text-white transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar