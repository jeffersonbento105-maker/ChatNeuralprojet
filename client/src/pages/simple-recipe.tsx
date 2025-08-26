import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Versão ajustada:
// - Área de mensagens centralizada com largura fixa de ~720px (igual ChatGPT)
// - Barra Send também respeita o mesmo limite
// - Layout clean, espaçamento confortável

const sampleRecipe = {
  title: "🥕 Ingredientes do Bolo de Cenoura",
  author: "Cozinha Exemplo",
  servings: 8,
  ingredients: [
    "3 cenouras médias (aprox. 250 g descascadas e picadas)",
    "3 ovos",
    "200 ml de óleo vegetal (milho, girassol ou canola)",
    "250 g de açúcar",
    "250 g de farinha de trigo peneirada",
    "1 colher de sopa (aprox. 12 g) de fermento químico em pó",
    "1 pitada de sal"
  ],
  coverage: [
    "200 g de açúcar",
    "50 g de chocolate em pó",
    "100 ml de leite",
    "30 g de manteiga"
  ],
  steps: [
    "Preaqueça o forno a 180°C.",
    "Bata a cenoura, ovos e óleo no liquidificador.",
    "Misture os secos e incorpore a mistura do liquidificador.",
    "Adicione o fermento por último e asse por 35-40 minutos."
  ]
};

function RecipeRenderer({ recipe }: { recipe: any }) {
  return (
    <div className="text-block" data-testid="recipe-block">
      <h2 className="title" data-testid="recipe-title">{recipe.title}</h2>
      <div className="author" data-testid="recipe-author">por {recipe.author}</div>
      
      <h4 data-testid="ingredients-heading">Ingredientes</h4>
      <ul className="ingredients-list" data-testid="ingredients-list">
        {recipe.ingredients.map((ing: string, i: number) => (
          <li key={i} data-testid={`ingredient-${i}`}>{ing}</li>
        ))}
      </ul>
      
      <h4 data-testid="coverage-heading">🍫 Cobertura de chocolate (opcional)</h4>
      <ul className="ingredients-list" data-testid="coverage-list">
        {recipe.coverage.map((ing: string, i: number) => (
          <li key={i} data-testid={`coverage-${i}`}>{ing}</li>
        ))}
      </ul>
      
      <h4 data-testid="steps-heading">Modo de Preparo</h4>
      <ol data-testid="steps-list">
        {recipe.steps.map((s: string, i: number) => (
          <li key={i} data-testid={`step-${i}`}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

const SimpleRecipe: React.FC = () => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const css = `
      .simple-recipe-page {
        min-height: 100vh;
        background: #f9fafb;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      
      .simple-recipe-header {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid #e5e7eb;
        padding: 1rem;
      }
      
      .simple-recipe-header-inner {
        max-width: 720px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .simple-recipe-content {
        padding: 2rem 1rem 120px 1rem;
        display: flex;
        justify-content: center;
      }
      
      .simple-recipe-container {
        width: 100%;
        max-width: 720px;
      }
      
      .simple-recipe-messages {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      
      .simple-recipe-page .text-block {
        background: #fff;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(0, 0, 0, 0.04);
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .simple-recipe-page .title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #111827;
        line-height: 1.3;
      }
      
      .simple-recipe-page .author {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 1rem;
        font-style: italic;
      }
      
      .simple-recipe-page .text-block h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 1.25rem 0 0.75rem 0;
        color: #374151;
        padding-bottom: 0.25rem;
        border-bottom: 2px solid #f3f4f6;
      }
      
      .simple-recipe-page .ingredients-list {
        list-style-type: disc;
        margin: 0 0 1rem 1.5rem;
        padding: 0;
      }
      
      .simple-recipe-page .ingredients-list li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
        color: #374151;
      }
      
      .simple-recipe-page .text-block ol {
        list-style-type: decimal;
        margin: 0 0 1rem 1.5rem;
        padding: 0;
      }
      
      .simple-recipe-page .text-block ol li {
        margin-bottom: 0.75rem;
        line-height: 1.6;
        color: #374151;
      }
      
      .simple-recipe-send-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: center;
        z-index: 100;
      }
      
      .simple-recipe-send-inner {
        width: 100%;
        max-width: 720px;
        display: flex;
        gap: 0.5rem;
      }
      
      .simple-recipe-input {
        flex: 1;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border: 1px solid #d1d5db;
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s ease;
      }
      
      .simple-recipe-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .simple-recipe-btn {
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        background: #111827;
        color: white;
        border: none;
        font-weight: 500;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s ease;
      }
      
      .simple-recipe-btn:hover {
        background: #1f2937;
        transform: translateY(-1px);
      }
      
      .simple-recipe-btn:active {
        transform: translateY(0);
      }
      
      /* Responsividade */
      @media (max-width: 768px) {
        .simple-recipe-content {
          padding: 1rem 0.5rem 120px 0.5rem;
        }
        
        .simple-recipe-page .text-block {
          padding: 1.25rem;
          border-radius: 8px;
        }
        
        .simple-recipe-send-bar {
          padding: 0.75rem;
        }
        
        .simple-recipe-input, .simple-recipe-btn {
          padding: 0.625rem 0.875rem;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'simple-recipe-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    
    return () => { 
      const el = document.getElementById('simple-recipe-styles'); 
      if(el) el.remove(); 
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log('Enviando:', input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="simple-recipe-page">
      {/* Header */}
      <header className="simple-recipe-header">
        <div className="simple-recipe-header-inner">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Chat</span>
            </button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Receita Simples</h1>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="simple-recipe-content">
        <div className="simple-recipe-container">
          <div className="simple-recipe-messages">
            <RecipeRenderer recipe={sampleRecipe} />
          </div>
        </div>
      </main>
      
      {/* Barra de envio */}
      <div className="simple-recipe-send-bar">
        <div className="simple-recipe-send-inner">
          <input 
            className="simple-recipe-input" 
            placeholder="Escreva uma mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            data-testid="message-input"
          />
          <button 
            className="simple-recipe-btn" 
            onClick={handleSend}
            data-testid="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleRecipe;