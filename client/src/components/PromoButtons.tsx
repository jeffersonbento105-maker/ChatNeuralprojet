import React, { useState, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'right' | 'left';
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = position === 'right' 
    ? 'left-full ml-2' 
    : 'right-full mr-2';

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${positionClasses} z-50`}>
          <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
            {content}
            <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-transparent ${
              position === 'right' ? '-left-1 border-r-4 border-r-gray-800' : '-right-1 border-l-4 border-l-gray-800'
            }`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

const PromoButtons: React.FC = () => {
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
    email: {
      pt: "Com o ChatNeural você pode criar emails formais, amigáveis e neutros dentro do chat.",
      en: "With ChatNeural you can create formal, friendly, and neutral emails in chat.",
      es: "Con ChatNeural puedes crear correos formales, amigables y neutrales dentro del chat."
    },
    cake: {
      pt: "Crie bolos de casamento e aniversários com o ChatNeural.",
      en: "Create wedding and birthday cakes with ChatNeural.",
      es: "Crea pasteles de boda y cumpleaños con ChatNeural."
    }
  };

  return (
    <div className="absolute top-4 right-4 z-40 flex gap-2">
      {/* Email Button */}
      <Tooltip content={tooltips.email[language]} position="left">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md shadow-md transition-colors duration-200 flex items-center justify-center"
          data-testid="promo-email-button"
        >
          <span className="text-base">📧</span>
        </button>
      </Tooltip>

      {/* Cake Button */}
      <Tooltip content={tooltips.cake[language]} position="left">
        <button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm rounded-md shadow-md transition-colors duration-200 flex items-center justify-center"
          data-testid="promo-cake-button"
        >
          <span className="text-base">🍰</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default PromoButtons;