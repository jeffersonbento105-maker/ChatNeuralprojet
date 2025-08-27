import React from 'react';

interface AssistantToggleProps {
  onToggle: (assistant: 'clark' | 'ragnaria') => void;
  currentAssistant: 'clark' | 'ragnaria';
}

const AssistantToggle: React.FC<AssistantToggleProps> = ({ onToggle, currentAssistant }) => {
  const toggleAssistant = () => {
    const newAssistant = currentAssistant === 'clark' ? 'ragnaria' : 'clark';
    onToggle(newAssistant);
  };

  return (
    <div className="mr-4">
      <button
        onClick={toggleAssistant}
        className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 ${
          currentAssistant === 'clark'
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            : 'bg-purple-400 text-white hover:bg-purple-500'
        }`}
        data-testid="assistant-toggle"
      >
        {currentAssistant === 'clark' ? 'Clark' : 'Ragnaria'}
      </button>
    </div>
  );
};

export default AssistantToggle;