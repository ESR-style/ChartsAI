import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BiMessageSquare, BiPlus, BiDotsVerticalRounded } from 'react-icons/bi'
import { FiLogOut, FiTrash2, FiArchive, FiShare2, FiEdit } from 'react-icons/fi'

const ChatSidebar = ({ chats, activeChat, onChatSelect, isCollapsed, onDeleteChat, isLoading }) => {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  // Separate ChatOptionsMenu into a more controlled component
  const ChatOptionsMenu = ({ chatId, onClose }) => (
    <div 
      ref={menuRef} 
      className="absolute right-0 top-[110%] mt-1 w-48 
        bg-white border border-gray-200 rounded-xl shadow-xl z-[100]
        animate-fadeIn"
      style={{ transformOrigin: 'top right' }}
    >
      <div className="py-1.5 px-1">
        <button
          onClick={() => {
            handleRename(chatId);
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 
            hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiEdit size={16} />
          <span>Rename</span>
        </button>
        <button
          onClick={() => {
            handleArchive(chatId);
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 
            hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArchive size={16} />
          <span>Archive</span>
        </button>
        <button
          onClick={() => {
            handleShare(chatId);
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-gray-600 
            hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiShare2 size={16} />
          <span>Share</span>
        </button>
        <button
          onClick={() => {
            onDeleteChat(chatId);
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-500 
            hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiTrash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-80 text-gray-700 flex flex-col h-[calc(100vh-4rem)] 
      overflow-hidden border-r border-gray-200 bg-gray-50">
      <div className="p-4 flex flex-col h-full">
        <button
          className="flex items-center gap-3 p-4 rounded-xl 
            bg-white hover:bg-gray-100
            border border-gray-200 hover:border-gray-300
            transition-all duration-300 w-full mb-6 group"
          onClick={() => onChatSelect(null)}
        >
          <BiPlus size={20} className="text-gray-500 group-hover:text-gray-700 
            transition-colors transform group-hover:rotate-90 duration-300" />
          <span className="text-gray-700 group-hover:text-gray-900">New Chat</span>
        </button>
        
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 -mr-2">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-14 bg-gray-200 rounded-xl"></div>
              </div>
            ))
          ) : (
            chats.map(chat => (
              <div
                key={chat.id}
                className="relative" // Added wrapper for proper menu positioning
              >
                <div
                  onClick={() => onChatSelect(chat.id)}
                  className={`group p-3.5 rounded-xl cursor-pointer transition-all duration-200 
                    flex items-center gap-3 relative hover:shadow-sm select-none
                    active:scale-[0.99] active:duration-75
                    ${activeChat === chat.id 
                      ? 'bg-blue-50 text-gray-900 shadow-sm' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'}`}
                >
                  <div className="flex-1 flex items-center gap-3 min-w-0">
                    <BiMessageSquare size={18} className={`flex-shrink-0 transition-colors
                      ${activeChat === chat.id ? 'text-blue-600' : 'text-blue-500'}`} />
                    <span className="truncate overflow-hidden font-medium">{chat.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === chat.id ? null : chat.id);
                    }}
                    className="flex-shrink-0 md:opacity-0 md:group-hover:opacity-100 p-2.5 
                      hover:bg-blue-100 rounded-lg transition-all ml-2
                      focus:opacity-100 outline-none touch-manipulation"
                  >
                    <BiDotsVerticalRounded size={20} />
                  </button>
                </div>
                {menuOpen === chat.id && (
                  <ChatOptionsMenu 
                    chatId={chat.id} 
                    onClose={() => setMenuOpen(null)} 
                  />
                )}
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <button
            className="flex items-center gap-3 p-3.5 rounded-xl 
              hover:bg-red-50 transition-all duration-300 w-full 
              text-blue-600 hover:text-red-500 group
              border border-transparent hover:border-red-100"
            onClick={logout}
          >
            <FiLogOut size={20} className="group-hover:text-red-500 transition-colors" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar