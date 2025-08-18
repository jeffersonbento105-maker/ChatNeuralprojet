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
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2">
        <div 
          className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
          data-testid="typing-avatar"
        >
          {assistants[assistant].avatar}
        </div>
        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-500" data-testid="typing-text">{typingText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
