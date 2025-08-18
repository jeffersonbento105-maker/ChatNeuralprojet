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
    <main className="chat-main">
      {/* Messages Area */}
      <div className="messages-area" ref={messagesAreaRef} data-testid="messages-area">
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
      <MessageInput
        onSendMessage={chat.sendMessage}
        disabled={chat.isTyping}
        language={chat.language}
        data-testid="message-input"
      />
    </main>
  );
}
