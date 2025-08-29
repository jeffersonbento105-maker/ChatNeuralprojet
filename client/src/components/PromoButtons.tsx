import React, { useState, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'right' | 'left';
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'left' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 max-w-xs">
          <div className="bg-gray-800 text-white text-sm rounded-lg px-4 py-3 shadow-xl">
            {content}
            <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const PromoButtons: React.FC = () => {

  const tooltips = {
    email: "With Chat Neural, you can create formal, friendly, and neutral emails within the chat",
    recipes: "You can create wedding and birthday cakes with Chat Neural"
  };

  return (
    <div className="promo-buttons-fixed" style={{ position: 'fixed', right: '20px', top: '80px', zIndex: 999 }}>
      {/* Email Button */}
      <Tooltip content={tooltips.email}>
        <button 
          id="send-email-btn"
          onClick={() => window.open('/email', '_blank')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 mb-3"
          data-testid="button-email"
          data-tooltip="With Chat Neural, you can create formal, friendly, and neutral emails within the chat"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span className="text-sm font-medium">Send Email</span>
          <span className="text-base">📧</span>
        </button>
      </Tooltip>

      {/* Recipes Button */}
      <Tooltip content={tooltips.recipes}>
        <button 
          onClick={() => window.open('/recipe-viewer', '_blank')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 text-sm rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          data-testid="button-recipes"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span className="text-sm font-medium">Recipes</span>
          <span className="text-base">🍰</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default PromoButtons;