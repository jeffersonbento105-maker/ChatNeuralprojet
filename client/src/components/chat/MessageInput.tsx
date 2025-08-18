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
    <div className="flex items-end gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <Textarea
        ref={textareaRef}
        className="flex-1 min-h-[44px] max-h-[120px] border-0 focus:ring-0 focus:border-0 resize-none bg-transparent text-[15px] leading-relaxed placeholder:text-gray-500"
        placeholder={placeholder}
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        data-testid="input-message"
        rows={1}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 p-0"
        data-testid="button-send"
      >
        <Send size={18} />
      </Button>
    </div>
  );
}
