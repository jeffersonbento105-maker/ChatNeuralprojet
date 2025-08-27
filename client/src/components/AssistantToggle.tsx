import React, { useState, useEffect } from 'react';
import { useAssistant } from '@/hooks/use-assistant';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
            {content}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const AssistantToggle: React.FC = () => {
  const { currentAssistant, toggleAssistant } = useAssistant();
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('en');

  useEffect(() => {
    // Detect user language from browser
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('pt')) {
      setLanguage('pt');
    } else if (browserLang.startsWith('es')) {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }, []);

  const tooltips = {
    clark: {
      pt: "Inteligência lógica e objetiva",
      en: "Logical and objective intelligence",
      es: "Inteligencia lógica y objetiva"
    },
    ragnaria: {
      pt: "Inteligência criativa e livre",
      en: "Creative and free intelligence",
      es: "Inteligencia creativa y libre"
    }
  };



  return (
    <div className="mr-4">
      <Tooltip content={tooltips[currentAssistant][language]}>
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
      </Tooltip>
    </div>
  );
};

export default AssistantToggle;