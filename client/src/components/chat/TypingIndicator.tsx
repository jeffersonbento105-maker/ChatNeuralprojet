interface TypingIndicatorProps {
  assistant: 'clark' | 'ragnaria';
  language: 'pt' | 'en';
}

const assistants = {
  clark: { avatar: 'C' },
  ragnaria: { avatar: 'R' }
};

export default function TypingIndicator({ assistant, language }: TypingIndicatorProps) {
  const typingText = language === 'pt' ? 'Pensando...' : 'Thinking...';

  return (
    <div className="message ai">
      <div className="message-avatar" data-testid="typing-avatar">
        {assistants[assistant].avatar}
      </div>
      <div className="typing-indicator">
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
        <span className="ms-2" data-testid="typing-text">{typingText}</span>
      </div>
    </div>
  );
}
