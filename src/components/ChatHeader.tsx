
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ChatHeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const ChatHeader = ({ isDarkMode, onToggleDarkMode }: ChatHeaderProps) => {
  return (
    <header className={`border-b px-6 py-4 shadow-sm ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <div>
          <h1 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Vertex AI Agent
          </h1>
          <p className={`text-sm mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Intelligent conversation partner
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Sun className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
          <Switch
            checked={isDarkMode}
            onCheckedChange={onToggleDarkMode}
          />
          <Moon className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
