import React, { useEffect, useRef } from 'react'

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div 
        ref={modalRef} 
        className="bg-[#111111] rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto text-gray-100
          scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/40
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800 sticky top-0 bg-[#111111] backdrop-blur-sm backdrop-filter z-10">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-full"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal