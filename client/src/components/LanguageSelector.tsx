import { useState, useEffect } from 'react';
import { pt } from '../languages/pt.js';
import { en } from '../languages/en.js';
import { es } from '../languages/es.js';
import { de } from '../languages/de.js';
import { zh } from '../languages/zh.js';

interface LanguageSelectorProps {
  onLanguageChange: (lang: string) => void;
}

const languages = {
  pt: { label: '🇧🇷 PT', data: pt },
  en: { label: '🇺🇸 EN', data: en },
  es: { label: '🇪🇸 ES', data: es },
  de: { label: '🇩🇪 DE', data: de },
  zh: { label: '🇨🇳 ZH', data: zh }
};

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState('pt');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    onLanguageChange(langCode);
    setIsOpen(false);
    
    // Update UI texts
    updateUITexts(languages[langCode as keyof typeof languages].data);
  };

  const updateUITexts = (langData: any) => {
    // Update button texts
    const recipeBtn = document.querySelector('[data-testid="button-recipes"]') as HTMLElement;
    const emailBtn = document.querySelector('[data-testid="button-email"]') as HTMLElement;
    
    if (recipeBtn) recipeBtn.textContent = langData.recipeButton;
    if (emailBtn) emailBtn.textContent = langData.emailButton;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="language-selector fixed right-4 top-24 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        data-testid="button-language-toggle"
      >
        {languages[currentLang as keyof typeof languages].label}
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg py-1 min-w-[80px]">
          {Object.entries(languages).map(([code, { label }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                currentLang === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              data-testid={`option-language-${code}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}