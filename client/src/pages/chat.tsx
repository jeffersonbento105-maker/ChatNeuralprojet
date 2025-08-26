import { useState, useEffect } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import EmailSidebar from "@/components/email/EmailSidebar";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Mail, ChefHat } from "lucide-react";
import { Link } from "wouter";

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chat = useChat();

  useEffect(() => {
    document.title = "ChatNeural - AI Assistant Platform";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                🧠
              </div>
              ChatNeural
            </h1>
            
            <div className="flex items-center gap-3">
              <select 
                className="px-3 py-2 bg-white/90 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={chat.currentAssistant}
                onChange={(e) => chat.switchAssistant(e.target.value as 'clark' | 'ragnaria')}
                data-testid="assistant-selector"
              >
                <option value="clark">Clark - Analytical</option>
                <option value="ragnaria">Ragnaria - Creative</option>
              </select>
              
              <Link href="/receitas">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  data-testid="recipe-viewer-link"
                >
                  <ChefHat size={18} />
                  <span className="hidden sm:inline ml-1">Receitas</span>
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                data-testid="email-toggle"
              >
                <Mail size={18} />
                <span className="hidden sm:inline ml-1">Email</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto h-full">
          <div className="flex h-screen">
            {/* Chat Area */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-96' : ''}`}>
              <ChatContainer chat={chat} />
            </div>
            
            {/* Email Sidebar */}
            <EmailSidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)}
              language={chat.language}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
