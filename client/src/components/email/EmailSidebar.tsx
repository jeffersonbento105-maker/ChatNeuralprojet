import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Copy, RotateCw, Briefcase, Scale, Smile, Mail } from "lucide-react";
import { useEmailGenerator } from "@/hooks/use-email-generator";
import { useToast } from "@/hooks/use-toast";

interface EmailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'pt' | 'en';
}

const tones = [
  { value: 'formal', icon: Briefcase, label: { pt: 'Formal', en: 'Formal' } },
  { value: 'neutral', icon: Scale, label: { pt: 'Neutro', en: 'Neutral' } },
  { value: 'friendly', icon: Smile, label: { pt: 'Amigável', en: 'Friendly' } }
];

export default function EmailSidebar({ isOpen, onClose, language }: EmailSidebarProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState<'formal' | 'neutral' | 'friendly'>('formal');
  const emailGenerator = useEmailGenerator();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? 'Erro' : 'Error',
        description: language === 'pt' ? 'Por favor, descreva o e-mail' : 'Please describe the email'
      });
      return;
    }

    await emailGenerator.generateEmail(prompt, selectedTone, language);
  };

  const handleCopy = async () => {
    if (!emailGenerator.generatedEmail) return;
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailGenerator.generatedEmail);
      } else {
        // Fallback for iframe/insecure contexts
        const textArea = document.createElement('textarea');
        textArea.value = emailGenerator.generatedEmail;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      toast({
        title: language === 'pt' ? 'Sucesso' : 'Success',
        description: language === 'pt' ? 'E-mail copiado!' : 'Email copied!'
      });
    } catch (error) {
      console.error('Copy failed:', error);
      toast({
        variant: "destructive",
        title: language === 'pt' ? 'Erro' : 'Error',
        description: language === 'pt' ? 'Erro ao copiar' : 'Copy failed'
      });
    }
  };

  const texts = {
    title: language === 'pt' ? 'Gerar E-mail Profissional' : 'Generate Professional Email',
    description: language === 'pt' ? 'Descrição do E-mail' : 'Email Description',
    placeholder: language === 'pt' ? 'Descreva o e-mail que deseja gerar...' : 'Describe the email you want to generate...',
    tone: language === 'pt' ? 'Tom' : 'Tone',
    generate: language === 'pt' ? 'Gerar E-mail' : 'Generate Email',
    result: language === 'pt' ? 'E-mail Gerado' : 'Generated Email',
    copy: language === 'pt' ? 'Copiar' : 'Copy',
    regenerate: language === 'pt' ? 'Regenerar' : 'Regenerate',
    emptyState: language === 'pt' ? 'Seu e-mail gerado aparecerá aqui' : 'Your generated email will appear here'
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed right-0 top-16 bottom-0 w-96 bg-white border-l border-gray-200 shadow-lg z-30 transform transition-transform duration-300 ease-in-out" data-testid="email-sidebar">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Mail size={20} className="text-blue-500" />
            {texts.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            data-testid="button-close-sidebar"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="emailPrompt">
            {texts.description}
          </label>
          <Textarea
            id="emailPrompt"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            rows={4}
            placeholder={texts.placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            data-testid="input-email-prompt"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{texts.tone}</label>
          <div className="grid grid-cols-1 gap-2">
            {tones.map((tone) => {
              const Icon = tone.icon;
              return (
                <button
                  key={tone.value}
                  className={`flex items-center gap-2 p-3 border rounded-lg text-left text-sm font-medium transition-colors ${
                    selectedTone === tone.value 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTone(tone.value as any)}
                  data-testid={`tone-${tone.value}`}
                >
                  <Icon size={16} className="me-1" />
                  {tone.label[language]}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium"
          onClick={handleGenerate}
          disabled={emailGenerator.isGenerating}
          data-testid="button-generate-email"
        >
          {emailGenerator.isGenerating ? (
            <>
              <RotateCw size={16} className="mr-2 animate-spin" />
              {language === 'pt' ? 'Gerando...' : 'Generating...'}
            </>
          ) : (
            <>
              ✨ {texts.generate}
            </>
          )}
        </Button>

        {emailGenerator.generatedEmail && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{texts.result}</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm max-h-64 overflow-y-auto" data-testid="email-result">
              <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed">
                {emailGenerator.generatedEmail}
              </pre>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-sm"
                onClick={handleCopy}
                data-testid="button-copy-email"
              >
                <Copy size={16} className="mr-2" />
                {texts.copy}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-sm"
                onClick={handleGenerate}
                data-testid="button-regenerate-email"
              >
                <RotateCw size={16} className="mr-2" />
                {texts.regenerate}
              </Button>
            </div>
          </div>
        )}

        {!emailGenerator.generatedEmail && (
          <div className="text-center py-8 text-gray-500">
            <Mail size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">{texts.emptyState}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
