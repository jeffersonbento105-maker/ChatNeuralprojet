import { useState, useEffect, createContext, useContext } from 'react';

type AssistantType = 'clark' | 'ragnaria';

interface AssistantContextType {
  currentAssistant: AssistantType;
  setCurrentAssistant: (assistant: AssistantType) => void;
  toggleAssistant: () => void;
  getWelcomeMessage: () => string;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    // Fallback implementation when used outside provider
    const [currentAssistant, setCurrentAssistant] = useState<AssistantType>('clark');
    
    const toggleAssistant = () => {
      setCurrentAssistant(prev => prev === 'clark' ? 'ragnaria' : 'clark');
    };

    const getWelcomeMessage = () => {
      const messages = {
        clark: "Olá, eu sou o Clark, sou assistente de IA, analítico, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?",
        ragnaria: "Olá, eu sou a Ragnaria, sou assistente virtual, IA, criativa, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?"
      };
      return messages[currentAssistant];
    };

    return {
      currentAssistant,
      setCurrentAssistant,
      toggleAssistant,
      getWelcomeMessage
    };
  }
  return context;
};

export { AssistantContext };
export type { AssistantType, AssistantContextType };