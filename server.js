const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// OpenAI integration - using native fetch (Node 18+)
// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "default_key";

// Language detection helper
function detectLanguage(text) {
  const ptWords = ['o', 'a', 'e', 'é', 'da', 'do', 'que', 'não', 'como', 'para', 'com', 'uma', 'por', 'ser', 'ter', 'está', 'muito', 'mais', 'todo', 'quando', 'onde', 'porque', 'desde', 'sobre', 'entre', 'durante', 'através', 'dentro', 'fora'];
  const enWords = ['the', 'and', 'is', 'to', 'of', 'a', 'in', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but', 'his', 'from', 'they', 'she', 'or', 'an', 'were', 'been', 'their', 'what', 'your', 'when', 'him', 'my', 'has', 'had'];
  
  const words = text.toLowerCase().split(/\s+/);
  let ptScore = 0;
  let enScore = 0;
  
  words.forEach(word => {
    if (ptWords.includes(word)) ptScore++;
    if (enWords.includes(word)) enScore++;
  });
  
  return ptScore > enScore;
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'ChatNeural' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { assistant, message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ 
        error: 'Message is required',
        message: 'Mensagem é obrigatória' 
      });
    }

    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'default_key') {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        message: 'Chave da API OpenAI não configurada' 
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

    const systemPrompt = systemPrompts[assistant]?.[isPortuguese ? 'pt' : 'en'] || 
                        systemPrompts.clark[isPortuguese ? 'pt' : 'en'];

    // Build messages array
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-10), // Keep last 10 messages (5 exchanges)
      { role: "user", content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 1000,
        temperature: assistant === 'ragnaria' ? 0.8 : 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          message: 'Limite de taxa excedido' 
        });
      }
      throw new Error(`OpenAI API error: ${response.status} ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 
                 (isPortuguese ? "Desculpe, não consegui processar sua mensagem." : "Sorry, I couldn't process your message.");

    res.json({ reply });

  } catch (error) {
    console.error('Chat error:', error);
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Erro interno do servidor' 
    });
  }
});

// Email generation endpoint
app.post('/api/email', async (req, res) => {
  try {
    const { prompt, tone = "formal", lang = "en" } = req.body;

    if (!prompt?.trim()) {
      return res.status(400).json({ 
        error: 'Prompt is required',
        message: 'Prompt é obrigatório' 
      });
    }

    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'default_key') {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        message: 'Chave da API OpenAI não configurada' 
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
      ? `Você é um especialista em redação de e-mails profissionais. Gere um e-mail completo no tom ${toneInstructions[tone].pt} baseado na descrição do usuário. Inclua assunto, saudação, corpo e despedida apropriados. Use formatação clara e profissional.`
      : `You are a professional email writing expert. Generate a complete email in a ${toneInstructions[tone].en} tone based on the user's description. Include appropriate subject, greeting, body, and closing. Use clear and professional formatting.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 800,
        temperature: 0.4
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded',
          message: 'Limite de taxa excedido' 
        });
      }
      throw new Error(`OpenAI API error: ${response.status} ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const email = data.choices[0]?.message?.content || 
                 (isPortuguese ? "Erro ao gerar e-mail." : "Error generating email.");

    res.json({ email });

  } catch (error) {
    console.error('Email generation error:', error);
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Erro interno do servidor' 
    });
  }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🧠 ChatNeural server running on port ${PORT}`);
  console.log(`📡 Access at: http://0.0.0.0:${PORT}`);
});
