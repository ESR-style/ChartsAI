import React, { useState, useRef, useEffect } from 'react'
import { useTypewriter } from '../utils/useTypewriter'
import { BiMicrophone, BiPaperclip, BiSend, BiStop } from 'react-icons/bi'
import { BsChatLeftDots } from 'react-icons/bs'

// TODO: Import file upload and voice recording services when ready
// import { uploadService } from '../services/uploadService';
// import { voiceService } from '../services/voiceService';

const ChatArea = ({ chat, onSendMessage, isCentered }) => {
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
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
        // TODO: Replace with actual file upload
        // const uploadedFile = await uploadService.uploadFile(file);
        // const analysisResult = await uploadService.analyzeFile(uploadedFile.id);
        // onSendMessage(`Analyzing file: ${file.name}\n${analysisResult}`);
        
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
        // TODO: Implement voice recording stop and processing
        // const audioData = await voiceService.stopRecording();
        // const transcription = await voiceService.transcribe(audioData);
        // setInput(transcription);
      } else {
        // TODO: Implement voice recording start
        // await voiceService.startRecording();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Voice recording error:', error);
      setIsRecording(false);
    }
  }

  // Get the last assistant message for typewriter effect
  const lastAssistantMessage = chat?.messages?.filter(m => m.role === 'assistant' && !m.displayed).pop()
  const { displayedText, isTyping } = useTypewriter(lastAssistantMessage?.content || '')

  useEffect(() => {
    if (!isTyping && lastAssistantMessage) {
      lastAssistantMessage.displayed = true
    }
  }, [isTyping, lastAssistantMessage])

  const renderMessage = (message) => {
    if (!message || !message.content) return null;
    
    if (message.role === 'user') {
      return message.content;
    }

    // Only apply typewriter effect to the last assistant message of the active chat
    if (message.id === lastAssistantMessage?.id) {
      return (
        <>
          {displayedText}
          {isTyping && (
            <span className="inline-block w-1 h-4 ml-1 bg-gray-400 animate-pulse" />
          )}
        </>
      );
    }

    // Show full content for previous messages
    return message.content;
  };

  if (!chat || isCentered) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="mb-12 text-center max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/5 
              flex items-center justify-center border border-white/10">
              <BsChatLeftDots size={40} className="text-gray-400 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 
              bg-clip-text text-transparent tracking-tight">
              Welcome to ChartsAI
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Ask me anything about your data - I can help with charts, analysis, predictions, and insights.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-4 pl-5 pr-36 bg-[#161616] border border-white/10 rounded-xl 
                  text-white placeholder-gray-500
                  focus:outline-none focus:border-white/20 focus:ring-2 
                  focus:ring-white/20"
                placeholder="Ask about your data..."
                autoFocus
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleAttachment}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 
                    transition-colors"
                >
                  <BiPaperclip size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleVoiceRecording}
                  className={`p-2 rounded-lg transition-colors
                    ${isRecording 
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-500/5' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {isRecording ? <BiStop size={20} /> : <BiMicrophone size={20} />}
                </button>
                <button
                  type="submit"
                  className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 
                    transition-all duration-200 flex items-center gap-2"
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
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent 
        scrollbar-thumb-gray-800/50">
        <div className="max-w-4xl mx-auto space-y-6">
          {chat?.messages.map(message => (
            <div
              key={`${message.id}-${message.role}`} // Add role to ensure uniqueness
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-4 max-w-[85%] group ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white 
                  shadow-lg ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-800'
                }`}>
                  {message.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={`p-4 rounded-xl shadow-sm whitespace-pre-wrap ${
                  message.role === 'user' 
                    ? 'bg-white/10 text-white' 
                    : 'bg-[#161616] text-gray-200 border border-white/10'
                }`}>
                  {renderMessage(message)}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-white/10 bg-[#0f0f0f]/90 
        backdrop-blur-lg">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 pl-5 pr-36 bg-[#161616] border border-white/10 rounded-xl 
              text-white placeholder-gray-500
              focus:outline-none focus:border-white/20 focus:ring-2 
              focus:ring-white/20"
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
              onClick={handleVoiceRecording}
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