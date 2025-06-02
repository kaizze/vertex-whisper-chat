
import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage, { Source } from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: Source[];
}

const ChatInterface = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Vertex AI Agent. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Hi there! Can you help me understand how machine learning works?",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: "3",
      text: "I'd be happy to help! Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario. It works by identifying patterns in large datasets and using those patterns to make predictions or decisions about new, unseen data.",
      isUser: false,
      timestamp: new Date(),
      sources: [
        {
          id: "1",
          title: "Introduction to Machine Learning",
          url: "https://example.com/ml-intro",
          type: "article",
          description: "A comprehensive guide to understanding machine learning fundamentals and applications."
        },
        {
          id: "2",
          title: "Machine Learning Research Paper",
          type: "pdf",
          description: "Academic paper on modern ML techniques and methodologies."
        }
      ]
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate bot typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question. Let me provide you with a helpful response based on what you've asked.",
        isUser: false,
        timestamp: new Date(),
        sources: [
          {
            id: "3",
            title: "Related Documentation",
            url: "https://example.com/docs",
            type: "document",
            description: "Official documentation covering this topic in detail."
          }
        ]
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <ChatHeader isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              sources={message.sources}
              isDarkMode={isDarkMode}
            />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className={`rounded-2xl px-4 py-3 shadow-sm border max-w-xs ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              }`}>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-gray-400' : 'bg-gray-400'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-gray-400' : 'bg-gray-400'
                  }`} style={{ animationDelay: "0.1s" }}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-gray-400' : 'bg-gray-400'
                  }`} style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ChatInterface;
