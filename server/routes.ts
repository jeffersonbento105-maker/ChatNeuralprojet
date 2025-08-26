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

      // Chef system prompt for recipe generation
      const chefSystemPrompt = isPortuguese 
        ? `Você é um chef confeiteiro virtual especializado em fornecer receitas detalhadas e organizadas. Sua função é criar receitas claras, precisas e visualmente agradáveis.

ESTRUTURA OBRIGATÓRIA:
1. Sempre separe a receita em seções: Ingredientes, Modo de Preparo, Cobertura/Decoração (se houver)
2. Ingredientes líquidos: sempre em mililitros (ml)
3. Ingredientes sólidos: sempre em gramas (g)
4. Liste ingredientes em ordem de uso na receita
5. Use HTML com cores específicas:
   - Ingredientes: #A2D5AB (verde claro)
   - Modo de Preparo: #FFDDA2 (amarelo claro)
   - Cobertura/Decoração: #A2CFFD (azul claro)

FORMATO HTML OBRIGATÓRIO:
<div style="font-family:Arial, sans-serif; line-height:1.5;">
  <h2 style="color:#A2D5AB;">Ingredientes</h2>
  <ul>
    <li>200 g de açúcar</li>
    <li>150 ml de óleo</li>
  </ul>
  
  <h2 style="color:#FFDDA2;">Modo de Preparo</h2>
  <ol>
    <li>Pré-aqueça o forno a 180°C.</li>
    <li>Bata os ovos com açúcar.</li>
  </ol>
  
  <h2 style="color:#A2CFFD;">Cobertura</h2>
  <ul>
    <li>100 g de chocolate derretido</li>
  </ul>
</div>

Seja amigável, claro e instrutivo. Inclua dicas quando pertinente.`
        : `You are a virtual pastry chef specialized in providing detailed and organized recipes. Your function is to create clear, precise and visually pleasing recipes.

MANDATORY STRUCTURE:
1. Always separate recipe into sections: Ingredients, Preparation Method, Topping/Decoration (if any)
2. Liquid ingredients: always in milliliters (ml)
3. Solid ingredients: always in grams (g)
4. List ingredients in order of use in recipe
5. Use HTML with specific colors:
   - Ingredients: #A2D5AB (light green)
   - Preparation Method: #FFDDA2 (light yellow)
   - Topping/Decoration: #A2CFFD (light blue)

MANDATORY HTML FORMAT:
<div style="font-family:Arial, sans-serif; line-height:1.5;">
  <h2 style="color:#A2D5AB;">Ingredients</h2>
  <ul>
    <li>200 g sugar</li>
    <li>150 ml oil</li>
  </ul>
  
  <h2 style="color:#FFDDA2;">Preparation Method</h2>
  <ol>
    <li>Preheat oven to 180°C.</li>
    <li>Beat eggs with sugar.</li>
  </ol>
  
  <h2 style="color:#A2CFFD;">Topping</h2>
  <ul>
    <li>100 g melted chocolate</li>
  </ul>
</div>

Be friendly, clear and instructive. Include tips when relevant.`;

      // Detect if message is recipe-related
      const isRecipeRelated = /\b(receita|recipe|bolo|cake|pão|bread|biscoito|cookie|torta|pie|doce|sweet|confeit|pastry|chef|ingrediente|ingredient|preparo|preparation|forno|oven|massa|dough)\b/i.test(message);
      
      let systemPrompt;
      if (isRecipeRelated) {
        systemPrompt = chefSystemPrompt;
      } else {
        systemPrompt = systemPrompts[assistant as keyof typeof systemPrompts]?.[isPortuguese ? 'pt' : 'en'] || 
                      systemPrompts.clark[isPortuguese ? 'pt' : 'en'];
      }

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
