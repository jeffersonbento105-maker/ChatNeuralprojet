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
    <div className="promo-buttons-fixed flex gap-3 items-center">
      {/* Email Button */}
      <Tooltip content={tooltips.email[language]}>
        <button 
          onClick={() => window.open('/email', '_blank')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          data-testid="promo-email-button"
        >
          <span className="text-sm font-medium">Email</span>
          <span className="text-base">📧</span>
        </button>
      </Tooltip>

      {/* Recipe Button */}
      <Tooltip content={tooltips.cake[language]}>
        <button 
          onClick={() => window.open('/recipe-viewer', '_blank')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 text-sm rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          data-testid="promo-cake-button"
        >
          <span className="text-sm font-medium">Recipe</span>
          <span className="text-base">🍰</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default PromoButtons;