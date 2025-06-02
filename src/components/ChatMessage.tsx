
import { useState } from "react";
import { Copy, ExternalLink, FileText } from "lucide-react";

export interface Source {
  id: string;
  title: string;
  url?: string;
  type: 'article' | 'document' | 'pdf';
  description?: string;
}

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Source[];
  isDarkMode: boolean;
}

const ChatMessage = ({ text, isUser, timestamp, sources, isDarkMode }: ChatMessageProps) => {
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

  const getSourceIcon = (type: Source['type']) => {
    switch (type) {
      case 'article':
        return <ExternalLink className="h-4 w-4" />;
      case 'document':
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
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
              : isDarkMode
                ? 'bg-gray-800 text-gray-100 border-gray-700 hover:shadow-md hover:border-gray-600'
                : 'bg-white text-gray-800 border-gray-100 hover:shadow-md hover:border-gray-200'
            }
          `}
          onClick={handleCopy}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {text}
          </p>
        </div>

        {/* Sources section - only for bot messages */}
        {!isUser && sources && sources.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sources:
            </p>
            <div className="space-y-2">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className={`
                    flex items-start space-x-3 p-3 rounded-lg border transition-colors
                    ${isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                    ${source.url ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => source.url && window.open(source.url, '_blank')}
                >
                  <div className={`mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {getSourceIcon(source.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {source.title}
                    </h4>
                    {source.description && (
                      <p className={`text-xs mt-1 line-clamp-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {source.description}
                      </p>
                    )}
                    <span className={`text-xs capitalize ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {source.type}
                    </span>
                  </div>
                  {source.url && (
                    <ExternalLink className={`h-3 w-3 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hover actions */}
        <div className={`
          absolute ${isUser ? 'right-0' : 'left-0'} -bottom-6 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          flex items-center space-x-2 text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }
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
