import React, { useState, useRef } from 'react'
import { useTypewriter } from '../utils/useTypewriter'
import { BiMicrophone, BiPaperclip, BiSend, BiStop } from 'react-icons/bi'
import { BsChatLeftDots } from 'react-icons/bs'

const ChatArea = ({ chat, onSendMessage }) => {
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isCentered, setIsCentered] = useState(true)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setIsCentered(false)
    onSendMessage(input)
    setInput('')
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // TODO: Handle file upload
      console.log('File selected:', file)
    }
  }

  if (!chat && isCentered) {
    return (
      <div className="flex-1 flex flex-col bg-black">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-12 text-gray-400 text-center">
            <BsChatLeftDots size={64} className="mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl font-bold mb-3 text-gray-200">Welcome to ChartsAI</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Ask anything about your data and get intelligent visualizations and insights.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 pr-36 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xl transition-all duration-200"
                placeholder="Ask about your data..."
                autoFocus
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleAttachment}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-600"
                >
                  <BiPaperclip size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg ${
                    isRecording 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-400 hover:text-white'
                  } hover:bg-gray-600`}
                >
                  {isRecording ? <BiStop size={20} /> : <BiMicrophone size={20} />}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                >
                  <BiSend size={20} />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".csv,.xlsx,.json"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        <div className="max-w-3xl mx-auto space-y-6">
          {chat?.messages.map(message => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`flex items-start gap-4 max-w-[80%] group ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {message.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`p-4 rounded-xl ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-900 text-gray-100'
                } shadow-lg transition-all duration-200`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-black">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 pr-36 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-200"
            placeholder="Type your message..."
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="button"
              onClick={handleAttachment}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-600"
            >
              <BiPaperclip size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded-lg ${
                isRecording 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-white'
              } hover:bg-gray-600`}
            >
              {isRecording ? <BiStop size={20} /> : <BiMicrophone size={20} />}
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
            >
              <BiSend size={20} />
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