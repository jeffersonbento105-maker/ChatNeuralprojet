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
  
  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-2 max-w-[80%]">
          <div 
            className="bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm"
            data-testid="bubble-user"
          >
            <p className="text-[15px] leading-relaxed">{message.content}</p>
          </div>
          <div 
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            data-testid="avatar-user"
          >
            U
          </div>
        </div>
      </div>
    );
  }

  const assistantData = assistant ? assistants[assistant] : { name: 'AI', avatar: 'A' };
  
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2 max-w-[80%]">
        <div 
          className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
          data-testid="avatar-ai"
        >
          {assistantData.avatar}
        </div>
        <div 
          className="bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm"
          data-testid="bubble-ai"
        >
          <p className="text-[15px] leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
