import React from "react";

function SendBar({ input, setInput, onSend }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="send-bar">
      <div className="send-inner">
        <input 
          className="input" 
          placeholder="Escreva uma pergunta ou cole JSON limpo aqui..." 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          data-testid="message-input"
        />
        <button 
          className="btn" 
          onClick={onSend}
          data-testid="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendBar;