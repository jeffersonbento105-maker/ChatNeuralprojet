import { useState } from "react";
import { generateEmail } from "@/lib/chat-service";
import { useToast } from "@/hooks/use-toast";

export interface EmailGeneratorHook {
  generatedEmail: string | null;
  isGenerating: boolean;
  generateEmail: (prompt: string, tone: 'formal' | 'neutral' | 'friendly', language: 'pt' | 'en') => Promise<void>;
}

export function useEmailGenerator(): EmailGeneratorHook {
  const [generatedEmail, setGeneratedEmail] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateEmail = async (
    prompt: string, 
    tone: 'formal' | 'neutral' | 'friendly', 
    language: 'pt' | 'en'
  ) => {
    setIsGenerating(true);

    try {
      const email = await generateEmail({ prompt, tone, lang: language });
      setGeneratedEmail(email);

      toast({
        title: language === 'pt' ? 'Sucesso' : 'Success',
        description: language === 'pt' ? 'E-mail gerado com sucesso!' : 'Email generated successfully!'
      });

    } catch (error) {
      console.error('Error generating email:', error);
      toast({
        variant: "destructive",
        title: language === 'pt' ? 'Erro' : 'Error',
        description: language === 'pt' ? 'Erro ao gerar e-mail' : 'Error generating email'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatedEmail,
    isGenerating,
    generateEmail: handleGenerateEmail
  };
}
