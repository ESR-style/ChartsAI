
import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, onComplete, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 25); // Slightly faster typing speed

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div className={className}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-1 h-4 ml-1 bg-gray-400 animate-pulse" />
      )}
    </div>
  );
};

export default TypingEffect;