import React from 'react';

const OrganizeTextButton: React.FC = () => {
  const organizeText = () => {
    // Encontra o texto da IA nas mensagens do chat
    const messages = document.querySelectorAll('.chatneural-bubble.assistant');
    if (messages.length === 0) return;

    // Pega a última mensagem da IA
    const lastMessage = messages[messages.length - 1] as HTMLElement;
    if (!lastMessage) return;

    let text = lastMessage.innerText;

    // Remove quebras de linha extras
    text = text.replace(/\n{2,}/g, "\n");

    // Adiciona numeração simples por linha
    const lines = text.split("\n").map((line, index) => {
      if (line.trim() === "") return "";
      return `${index + 1}. ${line.trim()}`;
    });

    // Atualiza o texto organizado
    lastMessage.innerHTML = lines.join("<br>");
  };

  return (
    <button
      id="organizeTextBtn"
      onClick={organizeText}
      title="Click to organize the AI text"
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '4px 8px',
        fontSize: '10px',
        backgroundColor: '#eee',
        color: '#333',
        border: '1px solid #aaa',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 9999,
        opacity: 0.5
      }}
    >
      Organize Text
    </button>
  );
};

export default OrganizeTextButton;