import React, { useState } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatArea from '../components/ChatArea'
import TopBar from '../components/TopBar'
import { mockChats } from '../utils/mockData'

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState(mockChats)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <TopBar 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isCollapsed={isSidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar 
          chats={chats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
          isCollapsed={isSidebarCollapsed}
        />
        <ChatArea 
          chat={activeChat ? chats.find(c => c.id === activeChat) : null}
          onSendMessage={(message) => {
            // TODO: Integrate with backend
            console.log('Sending message:', message)
          }}
        />
      </div>
    </div>
  )
}

export default Chat