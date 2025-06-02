
import { useState } from "react";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ text, isUser, timestamp }: ChatMessageProps) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] md:max-w-[60%] relative group`}
        onMouseEnter={() => setShowTimestamp(true)}
        onMouseLeave={() => setShowTimestamp(false)}
      >
        <div
          className={`
            rounded-2xl px-4 py-3 shadow-sm border transition-all duration-200 cursor-pointer
            ${isUser 
              ? 'bg-blue-500 text-white border-blue-500 hover:shadow-md' 
              : 'bg-white text-gray-800 border-gray-100 hover:shadow-md hover:border-gray-200'
            }
          `}
          onClick={handleCopy}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {text}
          </p>
        </div>
        
        {/* Hover actions */}
        <div className={`
          absolute ${isUser ? 'right-0' : 'left-0'} -bottom-6 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          flex items-center space-x-2 text-xs text-gray-500
        `}>
          <span>{formatTime(timestamp)}</span>
          {copied && (
            <span className="text-green-600 font-medium">Copied!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
