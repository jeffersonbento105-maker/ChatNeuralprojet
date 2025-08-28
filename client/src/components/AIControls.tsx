import React, { useState, useEffect } from 'react';

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

const AIControls: React.FC = () => {
  const [currentAssistant, setCurrentAssistant] = useState<'clark' | 'ragnaria'>('clark');
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

  const toggleAssistant = () => {
    setCurrentAssistant(prev => prev === 'clark' ? 'ragnaria' : 'clark');
  };

  return (
    <div className="mr-3">
      <div className="w-2 h-2 text-purple-600 flex items-center justify-center text-xs">
        🧠
      </div>
    </div>
  );
};

export default AIControls;