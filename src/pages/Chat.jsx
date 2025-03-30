import React, { useState, useEffect } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatArea from '../components/ChatArea'
import TopBar from '../components/TopBar'
import Modal from '../components/Modal'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import { chatService } from '../services/chatService'

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null)
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isChatCentered, setIsChatCentered] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen on mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // API call
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const threads = await chatService.getAllThreads();
        setChats(threads);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleDeleteChat = async (chatId) => {
    try {
      await chatService.deleteThread(chatId);
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      if (activeChat === chatId) {
        setActiveChat(null);
        setIsChatCentered(true);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

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
        // Create new thread first
        const newThread = await chatService.createThread(message.slice(0, 30));
        
        // Send message to new thread and get both user message and AI response
        const [userMessage, aiResponse] = await chatService.sendMessage(
          newThread.id, 
          message, 
          'user'
        );
        
        // Add new thread with both messages
        const threadWithMessages = {
          ...newThread,
          messages: [userMessage, aiResponse]
        };
        
        setChats(prev => [threadWithMessages, ...prev]);
        setActiveChat(newThread.id);
        setIsChatCentered(false);
      } else {
        // Send message to existing thread
        const [userMessage, aiResponse] = await chatService.sendMessage(
          activeChat, 
          message, 
          'user'
        );
        
        // Update existing thread with both new messages
        setChats(prev => prev.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, userMessage, aiResponse]
            };
          }
          return chat;
        }));
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isCollapsed={isSidebarCollapsed}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden relative bg-white">
        {/* Mobile overlay background - only show on mobile */}
        {!isSidebarCollapsed && isMobile && (
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsSidebarCollapsed(true)}
          />
        )}
        
        {/* Sidebar with proper visibility control */}
        <div 
          className={`${isSidebarCollapsed ? 'hidden md:block md:w-0 md:opacity-0' : 'block w-80'} 
            transition-all duration-300 ease-in-out`}
        >
          <ChatSidebar 
            chats={chats}
            isLoading={isLoading}
            activeChat={activeChat}
            onChatSelect={id => {
              if (id === null) handleNewChat();
              else {
                handleSelectChat(id);
                // Only close sidebar on mobile
                if (isMobile) {
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
          isSidebarCollapsed={isSidebarCollapsed}
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