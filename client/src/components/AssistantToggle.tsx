import React from 'react';

interface AssistantToggleProps {
  onToggle: (assistant: 'clark' | 'ragnaria') => void;
  currentAssistant: 'clark' | 'ragnaria';
}

const AssistantToggle: React.FC<AssistantToggleProps> = ({ onToggle, currentAssistant }) => {
  // Não usar onClick do React, deixar o JavaScript puro controlar
  return (
    <div className="mr-4">
      <button
        id="toggleCharacter"
        className="inline-block mx-5 py-2 px-5 text-sm cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300 rounded transition-all duration-200"
        data-character="Clark"
        data-testid="assistant-toggle"
      >
        Trocar para Ragnaria
      </button>
    </div>
  );
};

export default AssistantToggle;