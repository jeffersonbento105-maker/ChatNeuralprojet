import { useState, useEffect } from 'react';
import { HelpCircle, X, Lightbulb } from 'lucide-react';

interface QuickTipsProps {
  currentAssistant: 'clark' | 'ragnaria';
  messageCount: number;
}

interface Tip {
  id: string;
  title: string;
  content: string;
  trigger: 'first_visit' | 'no_messages' | 'many_messages' | 'assistant_switch';
  assistant?: 'clark' | 'ragnaria';
}

const tips: Tip[] = [
  {
    id: 'welcome',
    title: 'Welcome to ChatNeural!',
    content: 'Try asking Clark for analytical help or switch to Ragnaria for creative assistance. You can also generate recipes and emails using the buttons on the right.',
    trigger: 'first_visit'
  },
  {
    id: 'clark_analytical',
    title: 'Clark - Analytical Assistant',
    content: 'Ask Clark for step-by-step explanations, data analysis, structured solutions, or educational content. Perfect for learning and problem-solving.',
    trigger: 'assistant_switch',
    assistant: 'clark'
  },
  {
    id: 'ragnaria_creative',
    title: 'Ragnaria - Creative Assistant',
    content: 'Ask Ragnaria for brainstorming, creative writing, innovative ideas, or fun conversations. Great for inspiration and creative projects.',
    trigger: 'assistant_switch',
    assistant: 'ragnaria'
  },
  {
    id: 'recipe_feature',
    title: 'Recipe Generation',
    content: 'Ask for any cake or dessert recipe and get beautifully formatted instructions with ingredients, preparation steps, and decoration tips.',
    trigger: 'no_messages'
  },
  {
    id: 'email_feature',
    title: 'Email Generator',
    content: 'Click the "Send Email" button to access our email generator with formal, neutral, and friendly tone options.',
    trigger: 'no_messages'
  },
  {
    id: 'language_support',
    title: 'Multi-Language Support',
    content: 'ChatNeural automatically detects your language and responds accordingly. You can also use the language selector for specific preferences.',
    trigger: 'many_messages'
  }
];

export default function QuickTips({ currentAssistant, messageCount }: QuickTipsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  const getContextualTip = (): Tip | null => {
    // First visit tip
    if (!hasShownWelcome && messageCount === 0) {
      return tips.find(tip => tip.trigger === 'first_visit') || null;
    }

    // Assistant-specific tips
    const assistantTip = tips.find(tip => 
      tip.trigger === 'assistant_switch' && tip.assistant === currentAssistant
    );
    if (assistantTip) return assistantTip;

    // No messages tips
    if (messageCount === 0) {
      const noMessageTips = tips.filter(tip => tip.trigger === 'no_messages');
      return noMessageTips[Math.floor(Math.random() * noMessageTips.length)];
    }

    // Many messages tips
    if (messageCount > 5) {
      const manyMessageTips = tips.filter(tip => tip.trigger === 'many_messages');
      return manyMessageTips[Math.floor(Math.random() * manyMessageTips.length)];
    }

    return null;
  };

  const showTip = () => {
    const tip = getContextualTip();
    if (tip) {
      setCurrentTip(tip);
      setIsOpen(true);
      if (tip.trigger === 'first_visit') {
        setHasShownWelcome(true);
      }
    }
  };

  const closeTip = () => {
    setIsOpen(false);
    setCurrentTip(null);
  };

  // Auto-show tips based on context
  useEffect(() => {
    if (!hasShownWelcome && messageCount === 0) {
      const timer = setTimeout(showTip, 2000);
      return () => clearTimeout(timer);
    }
  }, [messageCount, hasShownWelcome]);

  return (
    <>
      {/* Floating Quick Tips Button */}
      <button
        onClick={showTip}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 z-50"
        data-testid="button-quick-tips"
        title="Get contextual usage tips"
      >
        <Lightbulb size={20} />
      </button>

      {/* Tips Modal */}
      {isOpen && currentTip && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                  <HelpCircle size={16} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{currentTip.title}</h3>
              </div>
              <button
                onClick={closeTip}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="button-close-tip"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-700 leading-relaxed">{currentTip.content}</p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={closeTip}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                data-testid="button-tip-close"
              >
                Close
              </button>
              <button
                onClick={showTip}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
                data-testid="button-tip-next"
              >
                Next Tip
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}