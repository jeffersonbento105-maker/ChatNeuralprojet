import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { type ChatHook } from "@/hooks/use-chat";

interface ChatContainerProps {
  chat: ChatHook;
}

export default function ChatContainer({ chat }: ChatContainerProps) {
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  }, [chat.messages, chat.isTyping]);

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto space-y-4 px-2 pb-4"
        ref={messagesAreaRef} 
        data-testid="messages-area"
      >
        {chat.messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-center">
            <div className="max-w-md">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {chat.language === 'pt' ? 'Olá! Eu sou o ChatNeural' : 'Hello! I am ChatNeural'}
              </h2>
              <p className="text-gray-600 mb-4">
                {chat.language === 'pt' 
                  ? 'Escolha entre Clark (analítico) ou Ragnaria (criativo) e comece a conversar!'
                  : 'Choose between Clark (analytical) or Ragnaria (creative) and start chatting!'
                }
              </p>
            </div>
          </div>
        )}

        {chat.messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            assistant={message.role === 'assistant' ? chat.currentAssistant : undefined}
            data-testid={`message-${index}`}
          />
        ))}
        
        {chat.isTyping && (
          <TypingIndicator 
            assistant={chat.currentAssistant}
            language={chat.language}
            data-testid="typing-indicator"
          />
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-4">
        <MessageInput
          onSendMessage={chat.sendMessage}
          disabled={chat.isTyping}
          language={chat.language}
          data-testid="message-input"
        />
      </div>
    </div>
  );
}
