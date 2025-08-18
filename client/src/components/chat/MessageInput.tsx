import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  language: 'pt' | 'en';
}

export default function MessageInput({ onSendMessage, disabled, language }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;
    
    onSendMessage(trimmedMessage);
    setMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const placeholder = language === 'pt' 
    ? "Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
    : "Type your message... (Press Enter to send, Shift+Enter for new line)";

  return (
    <div className="input-area">
      <Textarea
        ref={textareaRef}
        className="message-input"
        placeholder={placeholder}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        data-testid="input-message"
      />
      <Button
        className="send-button"
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        data-testid="button-send"
      >
        <Send size={20} />
      </Button>
    </div>
  );
}
