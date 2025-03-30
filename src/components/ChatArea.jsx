import React, { useState, useRef, useEffect } from 'react'
import { BiMicrophone, BiPaperclip, BiSend, BiStop ,BiBarChart,BiLineChart,BiMessageSquareDetail,BiTrendingUp} from 'react-icons/bi'
import TypingEffect from './TypingEffect'
import DataGrid from './DataGrid'

const ChatArea = ({ chat, onSendMessage, isCentered, isSidebarCollapsed }) => {
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [expandedGrid, setExpandedGrid] = useState(false)
  const fileInputRef = useRef(null)
  const bottomRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    try {
      setIsProcessing(true)
      await onSendMessage(input)
      setInput('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        // Temporary mock implementation
        onSendMessage(`Analyzing file: ${file.name}\nMock analysis result...`);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  }

  const handleVoiceRecording = async () => {
    try {
      if (isRecording) {
        setIsRecording(false);
      } else {
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Voice recording error:', error);
      setIsRecording(false);
    }
  }

  const renderMessage = (message) => {
    if (!message || !message.content) return null;
    
    if (message.sender === 'user') {
      return message.content;
    }

    const content = typeof message.content === 'string' ? JSON.parse(message.content) : message.content;
    
    return (
      <div className="flex-1">
        {content.text && <p className="whitespace-pre-wrap mb-4">{content.text}</p>}
        {content.type === 'table' && content.data && (
          <DataGrid 
            data={content.data} 
            isExpanded={expandedGrid}
            onToggleExpand={() => setExpandedGrid(!expandedGrid)}
          />
        )}
        {content.followup && <p className="whitespace-pre-wrap mt-4">{content.followup}</p>}
      </div>
    );
  };

  if (!chat || isCentered) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center bg-white transition-all duration-300 ${isSidebarCollapsed ? 'w-full' : ''}`}>
      <div className={`text-center px-4 transition-all duration-300 ${isSidebarCollapsed ? 'scale-100' : 'scale-95'}`} style={{ width: "780px", height: "502px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Charts AI</h1>
        <p className="text-xl text-gray-600 mb-10">
        Ask me anything about your data, whether it is about charts, analysis, predictions, and insights.
        </p>
        <form onSubmit={handleSubmit} className="relative mx-auto" style={{ width: "575px", height: "84px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-full p-5 pl-6 pr-16 bg-gray-100 border border-gray-300 rounded-2xl text-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask about data"
          style={{ width: "575px", height: "84px" }}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button
          type="button"
          onClick={handleAttachment}
          className="text-gray-500 hover:text-gray-700"
          >
          <BiPaperclip size={24} />
          </button>
          <button
          type="button"
          onClick={handleVoiceRecording}
          className={`text-gray-500 hover:text-gray-700 ${isRecording ? 'text-red-500' : ''}`}
          >
          {isRecording ? <BiStop size={24} /> : <BiMicrophone size={24} />}
          </button>
          <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600"
          >
          <BiSend size={24} />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        </form>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button className="px-5 py-3 bg-gray-200 text-gray-700 rounded-md text-base hover:bg-gray-300 flex items-center gap-2">
          <BiBarChart size={20} />
          An example about charts
        </button>
        <button className="px-5 py-3 bg-gray-200 text-gray-700 rounded-md text-base hover:bg-gray-300 flex items-center gap-2">
          <BiLineChart size={20} />
          An example about charts
        </button>
        <button className="px-5 py-3 bg-gray-200 text-gray-700 rounded-md text-base hover:bg-gray-300 flex items-center gap-2">
          <BiMessageSquareDetail size={20} />
          Examples of prompts
        </button>
        <button className="px-5 py-3 bg-gray-200 text-gray-700 rounded-md text-base hover:bg-gray-300 flex items-center gap-2">
          <BiLineChart size={20} />
          Prompt example of insight
        </button>
        <button className="px-5 py-3 bg-gray-200 text-gray-700 rounded-md text-base hover:bg-gray-300 flex items-center gap-2">
          <BiTrendingUp size={20} />
          An example on predictions
        </button>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${isSidebarCollapsed ? 'w-full' : 'w-full'}`}>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className={`mx-auto space-y-6 transition-all duration-300 ${isSidebarCollapsed ? 'max-w-5xl' : 'max-w-4xl'}`}>
          {chat?.messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-4 ${message.sender === 'user' ? 'max-w-[85%]' : 'max-w-full w-full'} group ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white 
                  shadow-lg flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gray-500'
                }`}>
                  {message.sender === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`p-4 rounded-xl shadow-sm whitespace-pre-wrap flex-1 text-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-100 text-gray-800' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {renderMessage(message)}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200 bg-white">
        <div className={`mx-auto relative transition-all duration-300 ${isSidebarCollapsed ? 'max-w-3xl' : 'max-w-2xl'}`} style={{ width: "575px", height: "84px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full p-5 pl-6 pr-36 bg-gray-100 border border-gray-300 rounded-xl 
              text-lg text-gray-800 placeholder-gray-500
              focus:outline-none focus:border-blue-300 focus:ring-2 
              focus:ring-blue-200"
            placeholder="Type your message..."
            style={{ width: "575px", height: "84px" }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAttachment}
              className="p-3 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <BiPaperclip size={24} />
            </button>
            <button
              type="button"
              onClick={handleVoiceRecording}
              className={`p-3 rounded-lg ${
                isRecording 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-gray-700'
              } hover:bg-gray-200`}
            >
              {isRecording ? <BiStop size={24} /> : <BiMicrophone size={24} />}
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2"
            >
              <BiSend size={24} />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </form>
    </div>
  )
}

export default ChatArea