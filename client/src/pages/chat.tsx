import { useState, useEffect } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import EmailSidebar from "@/components/email/EmailSidebar";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chat = useChat();

  useEffect(() => {
    document.title = "ChatNeural - AI Assistant Platform";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="flex items-center gap-3">
              <h1 className="brand">
                <div className="brand-icon">🧠</div>
                ChatNeural
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <select 
                className="assistant-selector"
                value={chat.currentAssistant}
                onChange={(e) => chat.switchAssistant(e.target.value as 'clark' | 'ragnaria')}
                data-testid="assistant-selector"
              >
                <option value="clark">Clark - Analytical</option>
                <option value="ragnaria">Ragnaria - Creative</option>
              </select>
              
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span data-testid="status-text">
                  {chat.language === 'pt' ? 'Online' : 'Online'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <div className="chat-container">
          <ChatContainer chat={chat} />
          <EmailSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            language={chat.language}
          />
        </div>
      </div>

      {/* Email Toggle Button */}
      <Button
        className="email-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        data-testid="email-toggle"
      >
        <Mail size={24} />
      </Button>
    </div>
  );
}
