import { useState, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import PromoButtons from "@/components/PromoButtons";
import AIControls from "@/components/AIControls";
import AssistantToggle from "@/components/AssistantToggle";
import LanguageSelector from "@/components/LanguageSelector";
import DetoxButton from "@/components/DetoxButton";
import OrganizeTextButton from "@/components/OrganizeTextButton";

export default function Chat() {
  const chat = useChat();
  const [input, setInput] = useState("");
  const [currentAssistant, setCurrentAssistant] = useState<'clark' | 'ragnaria'>('clark');
  const [selectedLanguage, setSelectedLanguage] = useState('pt');

  useEffect(() => {
    document.title = "ChatNeural";
    
    // Inject ChatGPT-style CSS
    const css = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #f7f7f8;
        line-height: 1.6;
      }
      
      .chatneural-app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #f7f7f8;
      }
      
      .chatneural-header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid #e5e7eb;
        padding: 0.75rem 1rem;
      }
      
      .chatneural-header-content {
        max-width: 720px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .chatneural-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #374151;
        letter-spacing: -0.025em;
        margin: 0;
      }
      
      .chatneural-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        max-width: 720px;
        margin: 0 auto;
        width: 100%;
        padding: 0.5rem 1rem 120px 1rem;
      }
      
      .chatneural-messages {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .chatneural-message {
        display: flex;
        animation: fadeInUp 0.3s ease-out;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .chatneural-message.user {
        justify-content: flex-end;
      }
      
      .chatneural-message.assistant {
        justify-content: flex-start;
      }
      
      .chatneural-bubble {
        max-width: 80%;
        padding: 1rem 1.25rem;
        border-radius: 1.5rem;
        word-wrap: break-word;
        white-space: pre-wrap;
        line-height: 1.5;
      }
      
      .chatneural-bubble.user {
        background-color: #343541;
        color: white;
        margin-left: 20%;
      }
      
      .chatneural-bubble.assistant {
        background-color: white;
        color: #374151;
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        margin-right: 20%;
      }
      
      .chatneural-input-area {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        border-top: 1px solid #e5e7eb;
        padding: 1rem;
        z-index: 100;
      }
      
      .chatneural-input-container {
        max-width: 720px;
        margin: 0 auto;
        display: flex;
        gap: 0.75rem;
        align-items: center;
      }
      
      .chatneural-input {
        flex: 1;
        padding: 0.875rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 1.5rem;
        background: white;
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        resize: none;
        transition: all 0.2s ease;
      }
      
      .chatneural-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .chatneural-send {
        background: #343541;
        color: white;
        border: none;
        border-radius: 1.5rem;
        padding: 0.875rem 1.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1rem;
        min-width: 80px;
      }
      
      .chatneural-send:hover {
        background: #40414f;
        transform: translateY(-1px);
      }
      
      .chatneural-send:active {
        transform: translateY(0);
      }
      
      .chatneural-send:disabled {
        background: #9ca3af;
        cursor: not-allowed;
        transform: none;
      }
      
      /* Loading indicator */
      .chatneural-typing {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
        font-style: italic;
      }
      
      .chatneural-typing::after {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #6b7280;
        animation: typing 1.4s infinite ease-in-out;
      }
      
      @keyframes typing {
        0%, 80%, 100% {
          opacity: 0.3;
        }
        40% {
          opacity: 1;
        }
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .chatneural-main {
          padding: 1rem 0.75rem 120px 0.75rem;
        }
        
        .chatneural-bubble {
          max-width: 85%;
          padding: 0.875rem 1rem;
          border-radius: 1.25rem;
        }
        
        .chatneural-input-area {
          padding: 0.75rem;
        }
        
        .chatneural-input {
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
        }
        
        .chatneural-send {
          padding: 0.75rem 1.25rem;
          font-size: 0.95rem;
          min-width: 70px;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'chatneural-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    
    return () => { 
      const el = document.getElementById('chatneural-styles'); 
      if(el) el.remove(); 
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || chat.isTyping) return;
    
    const message = input.trim();
    setInput("");
    await chat.sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Sistema HTML + CSS + JS integrado para troca dinâmica
  useEffect(() => {
    const setupDynamicSystem = () => {
      const toggleButton = document.getElementById('toggleCharacter');
      const balloon = document.getElementById('introBalloon');

      if (toggleButton && balloon) {
        // Define estado inicial
        toggleButton.setAttribute('data-character', 'Clark');
        toggleButton.innerText = "Clark";
        balloon.innerText = "Olá, eu sou o Clark, sou assistente de IA, analítico, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?";

        // Remove listeners anteriores
        const newButton = toggleButton.cloneNode(true) as HTMLElement;
        toggleButton.parentNode?.replaceChild(newButton, toggleButton);

        // Sistema de troca entre Clark e Ragnaria com debug
        newButton.addEventListener('click', (e) => {
          e.preventDefault();
          const balloon = document.getElementById('introBalloon');
          const button = document.getElementById('toggleCharacter') as HTMLButtonElement;
          
          if (balloon && button) {
            const currentCharacter = button.dataset.character || 'Clark';
            console.log('Clique detectado, personagem atual:', currentCharacter);
            
            if(currentCharacter === 'Clark'){
              // Troca para Ragnaria
              balloon.innerText = "Olá, eu sou a Ragnaria, sou assistente virtual, IA, criativa, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?";
              button.setAttribute('data-character', 'Ragnaria');
              button.innerText = "Ragnaria";
              button.className = "px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 bg-purple-400 text-white hover:bg-purple-500";
              console.log('Mudou para Ragnaria');
            } else {
              // Troca para Clark
              balloon.innerText = "Olá, eu sou o Clark, sou assistente de IA, analítico, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?";
              button.setAttribute('data-character', 'Clark');
              button.innerText = "Clark";
              button.className = "px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300";
              console.log('Mudou para Clark');
            }
          }
        });
      }
    };

    const timer = setTimeout(setupDynamicSystem, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chatneural-app relative min-h-screen">
      {/* Header */}
      <header className="chatneural-header">
        <div className="chatneural-header-content flex items-center justify-center">
          <div className="flex items-center">
            <AIControls />
            <AssistantToggle onToggle={setCurrentAssistant} currentAssistant={currentAssistant} />
            <h1 className="chatneural-title">ChatNeural</h1>
          </div>
        </div>
      </header>

      {/* Fixed Promo Buttons */}
      <PromoButtons />
      
      {/* Detox Button */}
      <DetoxButton />
      
      {/* Organize Text Button */}
      <OrganizeTextButton />
      
      {/* Language Selector */}
      <LanguageSelector onLanguageChange={setSelectedLanguage} />

      {/* Main chat area */}
      <main className="chatneural-main">
        <div className="chatneural-messages">
          {chat.messages.length === 0 ? (
            <div key={currentAssistant} className="chatneural-message assistant">
              <div id="introBalloon" className="chatneural-bubble assistant">
                {currentAssistant === 'clark' 
                  ? "Olá, eu sou o Clark, sou assistente de IA, analítico, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?"
                  : "Olá, eu sou a Ragnaria, sou assistente virtual, IA, criativa, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?"
                }
              </div>
            </div>
          ) : (
            chat.messages.map((message, index) => {
              // Check if content contains HTML (recipe format)
              const containsHTML = /<[^>]*>/g.test(message.content);
              
              return (
                <div 
                  key={index} 
                  className={`chatneural-message ${message.role}`}
                >
                  <div className={`chatneural-bubble ${message.role}`}>
                    {containsHTML ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: message.content }}
                        className="recipe-content"
                      />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              );
            })
          )}
          
          {chat.isTyping && (
            <div className="chatneural-message assistant">
              <div className="chatneural-bubble assistant">
                <div className="chatneural-typing">Digitando</div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input area */}
      <div className="chatneural-input-area">
        <div className="chatneural-input-container">
          <textarea
            className="chatneural-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            rows={1}
            disabled={chat.isTyping}
            data-testid="message-input"
          />
          <button
            className="chatneural-send"
            onClick={handleSend}
            disabled={chat.isTyping || !input.trim()}
            data-testid="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
