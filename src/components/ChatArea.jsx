import React, { useState, useRef } from 'react'
import { useTypewriter } from '../utils/useTypewriter'
import { BiMicrophone, BiPaperclip, BiSend, BiStop } from 'react-icons/bi'

const ChatArea = ({ chat, onSendMessage }) => {
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
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

  return (
    <div className="flex-1 flex flex-col bg-gray-800">
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        <div className="max-w-3xl mx-auto">
          {chat?.messages.map(message => (
            <div
              key={message.id}
              className={`mb-6 flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`flex items-start gap-4 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  message.role === 'user' ? 'bg-gray-600' : 'bg-blue-600'
                }`}>
                  {message.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`p-4 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-700 text-gray-100 rounded-bl-none'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 pr-36 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
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