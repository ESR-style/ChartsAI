import React, { useState, useEffect } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatArea from '../components/ChatArea'
import TopBar from '../components/TopBar'
import { mockChats } from '../utils/mockData'
import Modal from '../components/Modal'
import Profile from '../components/Profile'
import Settings from '../components/Settings'

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState(mockChats)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isChatCentered, setIsChatCentered] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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

  const handleSendMessage = async (message) => {
    try {
      if (!activeChat) {
        // Create new chat
        const newChat = {
          id: Date.now(),
          title: message.slice(0, 30) + (message.length > 30 ? '...' : ''),
          messages: [
            { id: 1, role: 'user', content: message }
          ]
        };
        
        // Add new chat to state first
        setChats(prev => [newChat, ...prev]);
        setActiveChat(newChat.id);
        setIsChatCentered(false);

        // Add AI response after a short delay
        setTimeout(() => {
          setChats(prev => prev.map(chat => {
            if (chat.id === newChat.id) {
              return {
                ...chat,
                messages: [...chat.messages, {
                  id: 2,
                  role: 'assistant',
                  content: `Analysis of your request: "${message}"\n\n1. Data Overview:\n   - Processing your query\n   - Analyzing patterns\n   - Generating insights\n\n2. Key Findings:\n   - Trend analysis shows positive correlation\n   - 25% increase in relevant metrics\n   - Significant patterns detected\n\nWould you like to see a detailed visualization of these results?`
                }]
              };
            }
            return chat;
          }));
        }, 500); // 500ms delay to show typing effect

      } else {
        // Add user message first
        setChats(prev => prev.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, {
                id: chat.messages.length + 1,
                role: 'user',
                content: message
              }]
            };
          }
          return chat;
        }));

        // Add AI response after a short delay
        setTimeout(() => {
          setChats(prev => prev.map(chat => {
            if (chat.id === activeChat) {
              return {
                ...chat,
                messages: [...chat.messages, {
                  id: chat.messages.length + 2,
                  role: 'assistant',
                  content: `Analysis of: "${message}"\n\n1. Quick Summary:\n   - Processed request\n   - Found relevant patterns\n   - Generated insights\n\n2. Recommendations:\n   - Consider expanding scope\n   - Monitor key metrics\n   - Implement suggested changes\n\nShall I create a visualization for this data?`
                }]
              };
            }
            return chat;
          }));
        }, 200); // 500ms delay to show typing effect
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0f0f0f]">
      <TopBar 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isCollapsed={isSidebarCollapsed}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden relative bg-[#0f0f0f]">
        {/* Mobile overlay background - only show on mobile */}
        {!isSidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarCollapsed(true)}
          />
        )}
        <div className={`${
          !isSidebarCollapsed ? 'translate-x-0' : '-translate-x-full'
        } absolute md:relative z-50 md:z-auto transition-transform duration-300 ease-in-out bg-[#0f0f0f]`}>
          <ChatSidebar 
            chats={chats}
            activeChat={activeChat}
            onChatSelect={id => {
              if (id === null) handleNewChat();
              else {
                handleSelectChat(id);
                // Only close sidebar on mobile
                if (window.innerWidth < 768) {
                  setIsSidebarCollapsed(true);
                }
              }
            }}
            isCollapsed={isSidebarCollapsed}
            onDeleteChat={handleDeleteChat}
          />
        </div>
        <ChatArea 
          chat={activeChat ? chats.find(c => c.id === activeChat) : null}
          onSendMessage={handleSendMessage}
          isCentered={!activeChat && isChatCentered}
        />
      </div>
      <Modal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        title="Profile"
      >
        <Profile />
      </Modal>

      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        title="Settings"
      >
        <Settings />
      </Modal>
    </div>
  )
}

export default Chat