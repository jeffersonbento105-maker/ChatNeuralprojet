import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "default_key"
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "ChatNeural" });
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { assistant, message, history = [] } = req.body;

      if (!message?.trim()) {
        return res.status(400).json({ 
          error: "Message is required",
          message: "Mensagem é obrigatória" 
        });
      }

      if (!process.env.OPENAI_API_KEY && !process.env.OPENAI_KEY) {
        return res.status(500).json({ 
          error: "OpenAI API key not configured",
          message: "Chave da API OpenAI não configurada" 
        });
      }

      // Detect language
      const isPortuguese = detectLanguage(message);
      
      // Assistant system prompts
      const systemPrompts = {
        clark: {
          pt: "Você é o Clark, analítico, objetivo, educativo; responda com clareza e passo-a-passo quando útil; use listas numeradas; máximo 1 emoji por resposta.",
          en: "You are Clark, analytical, objective, educational; respond with clarity and step-by-step when useful; use numbered lists; maximum 1 emoji per response."
        },
        ragnaria: {
          pt: "Você é a Ragnaria, criativa e acolhedora; traga ideias e exemplos; use linguagem leve; até 2–3 emojis quando fizer sentido.",
          en: "You are Ragnaria, creative and welcoming; bring ideas and examples; use light language; up to 2-3 emojis when it makes sense."
        }
      };

      const systemPrompt = systemPrompts[assistant as keyof typeof systemPrompts]?.[isPortuguese ? 'pt' : 'en'] || 
                          systemPrompts.clark[isPortuguese ? 'pt' : 'en'];

      // Build messages array
      const messages = [
        { role: "system", content: systemPrompt },
        ...history.slice(-10), // Keep last 10 messages (5 exchanges)
        { role: "user", content: message }
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages as any,
        max_tokens: 1000,
        temperature: assistant === 'ragnaria' ? 0.8 : 0.3
      });

      const reply = completion.choices[0]?.message?.content || 
                   (isPortuguese ? "Desculpe, não consegui processar sua mensagem." : "Sorry, I couldn't process your message.");

      res.json({ reply });

    } catch (error: any) {
      console.error('Chat error:', error);
      
      if (error.status === 429) {
        return res.status(429).json({ 
          error: "Rate limit exceeded",
          message: "Limite de taxa excedido" 
        });
      }

      res.status(500).json({ 
        error: "Internal server error",
        message: "Erro interno do servidor" 
      });
    }
  });

  // Email generation endpoint
  app.post("/api/email", async (req, res) => {
    try {
      const { prompt, tone = "formal", lang = "en" } = req.body;

      if (!prompt?.trim()) {
        return res.status(400).json({ 
          error: "Prompt is required",
          message: "Prompt é obrigatório" 
        });
      }

      if (!process.env.OPENAI_API_KEY && !process.env.OPENAI_KEY) {
        return res.status(500).json({ 
          error: "OpenAI API key not configured",
          message: "Chave da API OpenAI não configurada" 
        });
      }

      const isPortuguese = lang === 'pt';
      
      const toneInstructions = {
        formal: {
          pt: "formal e profissional",
          en: "formal and professional"
        },
        neutral: {
          pt: "neutro e direto",
          en: "neutral and direct"
        },
        friendly: {
          pt: "amigável e caloroso",
          en: "friendly and warm"
        }
      };

      const systemPrompt = isPortuguese 
        ? `Você é um especialista em redação de e-mails profissionais. Gere um e-mail completo no tom ${toneInstructions[tone as keyof typeof toneInstructions].pt} baseado na descrição do usuário. Inclua assunto, saudação, corpo e despedida apropriados. Use formatação clara e profissional.`
        : `You are a professional email writing expert. Generate a complete email in a ${toneInstructions[tone as keyof typeof toneInstructions].en} tone based on the user's description. Include appropriate subject, greeting, body, and closing. Use clear and professional formatting.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 800,
        temperature: 0.4
      });

      const email = completion.choices[0]?.message?.content || 
                   (isPortuguese ? "Erro ao gerar e-mail." : "Error generating email.");

      res.json({ email });

    } catch (error: any) {
      console.error('Email generation error:', error);
      
      if (error.status === 429) {
        return res.status(429).json({ 
          error: "Rate limit exceeded",
          message: "Limite de taxa excedido" 
        });
      }

      res.status(500).json({ 
        error: "Internal server error",
        message: "Erro interno do servidor" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Language detection helper
function detectLanguage(text: string): boolean {
  const ptWords = ['o', 'a', 'e', 'é', 'da', 'do', 'que', 'não', 'como', 'para', 'com', 'uma', 'por', 'ser', 'ter', 'está', 'muito', 'mais', 'todo'];
  const enWords = ['the', 'and', 'is', 'to', 'of', 'a', 'in', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but', 'his', 'from', 'they', 'she', 'or'];
  
  const words = text.toLowerCase().split(/\s+/);
  let ptScore = 0;
  let enScore = 0;
  
  words.forEach(word => {
    if (ptWords.includes(word)) ptScore++;
    if (enWords.includes(word)) enScore++;
  });
  
  return ptScore > enScore;
}
