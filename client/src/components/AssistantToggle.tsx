import React from 'react';

interface AssistantToggleProps {
  onToggle: (assistant: 'clark' | 'ragnaria') => void;
  currentAssistant: 'clark' | 'ragnaria';
}

const AssistantToggle: React.FC<AssistantToggleProps> = ({ onToggle, currentAssistant }) => {
  const toggleAssistant = () => {
    const newAssistant = currentAssistant === 'clark' ? 'ragnaria' : 'clark';
    onToggle(newAssistant);
    
    // JavaScript puro para troca dinâmica instantânea
    const toggleButton = document.getElementById('toggleCharacter');
    const balloon = document.getElementById('introBalloon');
    
    if (toggleButton && balloon) {
      let current = toggleButton.getAttribute('data-character');
      
      if(current === 'clark'){
        // Troca para Ragnaria
        balloon.innerText = "Olá, eu sou a Ragnaria, sou assistente virtual, IA, criativa, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?";
        toggleButton.setAttribute('data-character', 'ragnaria');
      } else {
        // Troca para Clark
        balloon.innerText = "Olá, eu sou o Clark, sou assistente de IA, analítico, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?";
        toggleButton.setAttribute('data-character', 'clark');
      }
    }
  };

  return (
    <div className="mr-4">
      <button
        id="toggleCharacter"
        onClick={toggleAssistant}
        className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 ${
          currentAssistant === 'clark'
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            : 'bg-purple-400 text-white hover:bg-purple-500'
        }`}
        data-testid="assistant-toggle"
        data-character={currentAssistant}
      >
        {currentAssistant === 'clark' ? 'Clark' : 'Ragnaria'}
      </button>
    </div>
  );
};

export default AssistantToggle;