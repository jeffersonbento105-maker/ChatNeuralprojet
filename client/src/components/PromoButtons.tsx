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
        <div className="absolute top-full mt-2 left-0 z-50 max-w-xs">
          <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-xl">
            {content}
            <div className="absolute -top-1 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const PromoButtons: React.FC = () => {

  const tooltips = {
    email: "With ChatNeural, you can create formal, friendly, and neutral emails within the chat",
    recipes: "You can create wedding and birthday cakes with ChatNeural"
  };

  return (
    <div className="promo-buttons-fixed flex gap-3 items-center">
      {/* Email Button */}
      <Tooltip content={tooltips.email}>
        <button 
          onClick={() => window.open('/email', '_blank')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          data-testid="promo-email-button"
        >
          <span className="text-sm font-medium">Send Email</span>
          <span className="text-base">📧</span>
        </button>
      </Tooltip>

      {/* Recipes Button */}
      <Tooltip content={tooltips.recipes}>
        <button 
          onClick={() => window.open('/recipe-viewer', '_blank')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 text-sm rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          data-testid="promo-recipes-button"
        >
          <span className="text-sm font-medium">Recipes</span>
          <span className="text-base">🍰</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default PromoButtons;