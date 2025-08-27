import React, { useState, ReactNode } from 'react';
import { AssistantContext, AssistantType } from '@/hooks/use-assistant';

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [currentAssistant, setCurrentAssistant] = useState<AssistantType>('clark');

  const toggleAssistant = () => {
    setCurrentAssistant(prev => prev === 'clark' ? 'ragnaria' : 'clark');
  };

  const getWelcomeMessage = () => {
    const messages = {
      clark: "Olá, eu sou o Clark, sou assistente de IA, analítica, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?",
      ragnaria: "Olá, eu sou o Ragnaria, sou assistente virtual, IA, analítica, posso ajudar você com explicações detalhadas, soluções passo a passo e respostas estruturadas, como posso ajudar hoje?"
    };
    return messages[currentAssistant];
  };

  const value = {
    currentAssistant,
    setCurrentAssistant,
    toggleAssistant,
    getWelcomeMessage
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
};