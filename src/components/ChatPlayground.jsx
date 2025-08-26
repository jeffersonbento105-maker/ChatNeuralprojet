import React from "react";
import TextRenderer from "./TextRenderer";

function ChatPlayground({ items }) {
  return (
    <div className="messages" data-testid="chat-messages">
      {items.map((item, idx) => (
        <div 
          className={`message ${item.role || 'assistant'}`} 
          key={idx}
          data-testid={`message-${idx}`}
        >
          <TextRenderer data={item.data} />
        </div>
      ))}
    </div>
  );
}

export default ChatPlayground;