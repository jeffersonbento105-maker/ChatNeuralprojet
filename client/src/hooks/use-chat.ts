import { useState, useCallback } from "react";
import { detectLanguage } from "@/lib/language-detector";
import { sendChatMessage } from "@/lib/chat-service";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatHook {
  messages: Message[];
  currentAssistant: 'clark' | 'ragnaria';
  isTyping: boolean;
  language: 'pt' | 'en';
  sendMessage: (content: string) => Promise<void>;
  switchAssistant: (assistant: 'clark' | 'ragnaria') => void;
}

const welcomeMessages = {
  clark: {
    en: "👋 Hi! I'm Clark, your analytical AI assistant. I can help you with detailed explanations, step-by-step solutions, and structured answers. How can I assist you today?",
    pt: "👋 Olá! Eu sou o Clark, seu assistente de IA analítico. Posso ajudar com explicações detalhadas, soluções passo-a-passo e respostas estruturadas. Como posso ajudar hoje?"
  },
  ragnaria: {
    en: "🌟 Hey there! I'm Ragnaria, your creative AI companion. I love brainstorming ideas, finding innovative solutions, and making conversations fun! What inspiring project can we work on together? ✨",
    pt: "🌟 Olá! Eu sou a Ragnaria, sua companheira de IA criativa. Adoro fazer brainstorming, encontrar soluções inovadoras e tornar conversas divertidas! Que projeto inspirador podemos desenvolver juntas? ✨"
  }
};

export function useChat(): ChatHook {
  const [currentAssistant, setCurrentAssistant] = useState<'clark' | 'ragnaria'>('clark');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'pt' | 'en'>('en');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: welcomeMessages.clark.en
    }
  ]);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string, chatLanguage?: string) => {
    if (isTyping) return;

    // Use provided language or detect from content
    const detectedLang = detectLanguage(content);
    const currentLang = chatLanguage || (detectedLang ? 'pt' : 'en');
    setLanguage(detectedLang);

    // Add user message
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);

    try {
      // Get last 5 exchanges (10 messages) for context
      const history = messages.slice(-10);
      
      const reply = await sendChatMessage({
        assistant: currentAssistant,
        message: content,
        history,
        language: currentLang
      });

      // Add assistant response
      const assistantMessage: Message = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMessage]);

      toast({
        title: detectedLang === 'pt' ? 'Sucesso' : 'Success',
        description: detectedLang === 'pt' ? 'Mensagem enviada!' : 'Message sent!'
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: language === 'pt' ? 'Erro' : 'Error',
        description: language === 'pt' ? 'Erro ao enviar mensagem' : 'Error sending message'
      });
    } finally {
      setIsTyping(false);
    }
  }, [currentAssistant, isTyping, messages, language, toast]);

  const switchAssistant = useCallback((assistant: 'clark' | 'ragnaria') => {
    setCurrentAssistant(assistant);
    
    // Clear messages and add new welcome message
    const welcomeContent = welcomeMessages[assistant][language];
    setMessages([
      { role: 'assistant', content: welcomeContent }
    ]);
  }, [language]);

  return {
    messages,
    currentAssistant,
    isTyping,
    language,
    sendMessage,
    switchAssistant
  };
}
