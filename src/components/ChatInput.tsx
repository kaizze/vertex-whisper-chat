
import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isDarkMode: boolean;
}

const ChatInput = ({ onSendMessage, isDarkMode }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`border-t px-4 py-4 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className={`
                w-full resize-none rounded-xl border px-4 py-3 pr-12 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-colors min-h-[48px] max-h-32
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 hover:bg-gray-750' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 hover:bg-white'
                }
              `}
              rows={1}
              style={{
                height: 'auto',
                minHeight: '48px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim()}
            className={`
              flex items-center justify-center w-12 h-12 rounded-xl
              transition-all duration-200 shadow-sm
              ${input.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <Send size={18} />
          </button>
        </form>
        
        <p className={`text-xs mt-2 text-center ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
