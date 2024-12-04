import React, { useState } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatArea from '../components/ChatArea'
import TopBar from '../components/TopBar'
import { mockChats } from '../utils/mockData'

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState(mockChats)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    }
    setChats([newChat, ...chats])
    setActiveChat(newChat.id)
  }

  const handleSendMessage = (message) => {
    if (!activeChat || !chats.find(c => c.id === activeChat)) {
      const newChat = {
        id: Date.now(),
        title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
        messages: [{ id: 1, role: 'user', content: message }]
      }
      setChats([newChat, ...chats])
      setActiveChat(newChat.id)
    } else {
      const updatedChats = chats.map(chat => {
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
      })
      setChats(updatedChats)
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
          onChatSelect={id => id === null ? createNewChat() : setActiveChat(id)}
          isCollapsed={isSidebarCollapsed}
        />
        <ChatArea 
          chat={activeChat ? chats.find(c => c.id === activeChat) : null}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default Chat