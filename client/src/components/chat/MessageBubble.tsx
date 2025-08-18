import { type Message } from "@/hooks/use-chat";

interface MessageBubbleProps {
  message: Message;
  assistant?: 'clark' | 'ragnaria';
}

const assistants = {
  clark: { name: 'Clark', avatar: 'C' },
  ragnaria: { name: 'Ragnaria', avatar: 'R' }
};

export default function MessageBubble({ message, assistant }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const avatar = isUser ? 'U' : (assistant ? assistants[assistant].avatar : 'A');

  return (
    <div className={`message ${isUser ? 'user' : 'ai'}`}>
      <div className="message-avatar" data-testid={`avatar-${isUser ? 'user' : 'ai'}`}>
        {avatar}
      </div>
      <div className="message-bubble" data-testid={`bubble-${isUser ? 'user' : 'ai'}`}>
        <p>{message.content}</p>
      </div>
    </div>
  );
}
