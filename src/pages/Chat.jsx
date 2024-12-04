import React, { useState, useEffect } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatArea from '../components/ChatArea'
import TopBar from '../components/TopBar'
import { mockChats } from '../utils/mockData'

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState(mockChats)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isChatCentered, setIsChatCentered] = useState(true)

  const handleDeleteChat = (chatId) => {
    try {
      setChats(prev => prev.filter(chat => chat.id !== chatId))
      if (activeChat === chatId) {
        setActiveChat(null)
        setIsChatCentered(true)
      }
    } catch (error) {
      console.error('Failed to delete chat:', error)
    }
  }

  const handleNewChat = () => {
    setActiveChat(null)
    setIsChatCentered(true)
  }

  const handleSelectChat = (chatId) => {
    setActiveChat(chatId)
    setIsChatCentered(false)
  }

  const handleSendMessage = (message) => {
    try {
      if (!activeChat) {
        const newChat = {
          id: Date.now(),
          title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
          messages: [{ id: 1, role: 'user', content: message }]
        }
        setChats(prev => [newChat, ...prev])
        setActiveChat(newChat.id)
      } else {
        setChats(prev => prev.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, {
                id: chat.messages.length + 1,
                role: 'user',
                content: message
              }]
            }
          }
          return chat
        }))
      }
      setIsChatCentered(false)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <TopBar 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isCollapsed={isSidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar 
          chats={chats}
          activeChat={activeChat}
          onChatSelect={id => id === null ? handleNewChat() : handleSelectChat(id)}
          isCollapsed={isSidebarCollapsed}
          onDeleteChat={handleDeleteChat}
        />
        <ChatArea 
          chat={activeChat ? chats.find(c => c.id === activeChat) : null}
          onSendMessage={handleSendMessage}
          isCentered={!activeChat && isChatCentered}
        />
      </div>
    </div>
  )
}

export default Chat