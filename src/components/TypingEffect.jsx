import React, { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ text, onComplete, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    intervalRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(intervalRef.current);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 20); // Faster typing speed

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, onComplete]);

  // Force complete typing if component unmounts or changes
  useEffect(() => {
    return () => {
      if (isTyping && onComplete) {
        onComplete();
      }
    };
  }, [isTyping, onComplete]);

  return (
    <div className={className}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse" />
      )}
    </div>
  );
};

export default TypingEffect;