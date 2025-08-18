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
      await navigator.clipboard.writeText(emailGenerator.generatedEmail);
      toast({
        title: language === 'pt' ? 'Sucesso' : 'Success',
        description: language === 'pt' ? 'E-mail copiado!' : 'Email copied!'
      });
    } catch (error) {
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

  return (
    <aside className={`email-sidebar ${isOpen ? 'open' : ''}`} data-testid="email-sidebar">
      <div className="email-header">
        <h3 className="email-title">{texts.title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="close-sidebar"
          onClick={onClose}
          data-testid="button-close-sidebar"
        >
          <X size={20} />
        </Button>
      </div>

      <div className="email-content">
        <div className="form-group">
          <label className="form-label" htmlFor="emailPrompt">
            {texts.description}
          </label>
          <Textarea
            id="emailPrompt"
            className="form-control"
            rows={4}
            placeholder={texts.placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            data-testid="input-email-prompt"
          />
        </div>

        <div className="form-group">
          <label className="form-label">{texts.tone}</label>
          <div className="tone-selector">
            {tones.map((tone) => {
              const Icon = tone.icon;
              return (
                <button
                  key={tone.value}
                  className={`tone-option ${selectedTone === tone.value ? 'active' : ''}`}
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
          className="generate-btn"
          onClick={handleGenerate}
          disabled={emailGenerator.isGenerating}
          data-testid="button-generate-email"
        >
          {emailGenerator.isGenerating ? (
            <>
              <RotateCw size={16} className="me-2 animate-spin" />
              {language === 'pt' ? 'Gerando...' : 'Generating...'}
            </>
          ) : (
            <>
              ✨ {texts.generate}
            </>
          )}
        </Button>

        <div className="form-group">
          <label className="form-label">{texts.result}</label>
          <div className="email-result" data-testid="email-result">
            {emailGenerator.generatedEmail ? (
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {emailGenerator.generatedEmail}
              </pre>
            ) : (
              <div className="text-center text-muted py-5">
                <Mail size={48} className="mb-3 mx-auto opacity-50" />
                {texts.emptyState}
              </div>
            )}
          </div>
          
          {emailGenerator.generatedEmail && (
            <div className="email-actions">
              <Button
                variant="outline"
                size="sm"
                className="action-btn"
                onClick={handleCopy}
                data-testid="button-copy-email"
              >
                <Copy size={16} className="me-1" />
                {texts.copy}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="action-btn"
                onClick={handleGenerate}
                data-testid="button-regenerate-email"
              >
                <RotateCw size={16} className="me-1" />
                {texts.regenerate}
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
