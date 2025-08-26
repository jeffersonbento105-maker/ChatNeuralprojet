import React, { useState, useEffect } from "react";

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

function RecipeRenderer({ recipe }) {
  const [servings] = useState(recipe.servings || 1);

  return (
    <div className="text-block" data-testid="recipe-block">
      <h2 className="title" data-testid="recipe-title">{recipe.title}</h2>
      <div className="author" data-testid="recipe-author">por {recipe.author}</div>
      
      <h4 data-testid="ingredients-heading">Ingredientes</h4>
      <ul className="ingredients-list" data-testid="ingredients-list">
        {recipe.ingredients.map((ing, i) => (
          <li key={i} data-testid={`ingredient-${i}`}>{ing}</li>
        ))}
      </ul>
      
      <h4 data-testid="coverage-heading">🍫 Cobertura de chocolate (opcional)</h4>
      <ul className="ingredients-list" data-testid="coverage-list">
        {recipe.coverage.map((ing, i) => (
          <li key={i} data-testid={`coverage-${i}`}>{ing}</li>
        ))}
      </ul>
      
      <h4 data-testid="steps-heading">Modo de Preparo</h4>
      <ol data-testid="steps-list">
        {recipe.steps.map((s, i) => (
          <li key={i} data-testid={`step-${i}`}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

function SimpleRecipeApp() {
  const [input, setInput] = useState('');

  useEffect(() => {
    const css = `
      body { 
        background: #f9fafb; 
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
        margin: 0;
        padding: 0;
      }
      
      .app { 
        min-height: 100vh; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        padding: 2rem 1rem 100px 1rem; 
      }
      
      .chat-container { 
        width: 100%; 
        max-width: 720px; 
        margin: 0 auto; 
      }
      
      .messages { 
        display: flex; 
        flex-direction: column; 
        gap: 1.25rem; 
      }
      
      .text-block { 
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
      
      .title { 
        font-size: 1.25rem; 
        margin-bottom: 0.5rem; 
        font-weight: 600; 
        color: #111827;
        line-height: 1.3;
      }
      
      .author { 
        font-size: 0.9rem; 
        color: #6b7280; 
        margin-bottom: 1rem; 
        font-style: italic;
      }
      
      .text-block h4 {
        font-size: 1rem;
        font-weight: 600;
        margin: 1.25rem 0 0.75rem 0;
        color: #374151;
        padding-bottom: 0.25rem;
        border-bottom: 2px solid #f3f4f6;
      }
      
      .ingredients-list {
        list-style-type: disc;
        margin: 0 0 1rem 1.5rem;
        padding: 0;
      }
      
      .ingredients-list li { 
        margin-bottom: 0.5rem; 
        line-height: 1.5;
        color: #374151;
      }
      
      .text-block ol {
        list-style-type: decimal;
        margin: 0 0 1rem 1.5rem;
        padding: 0;
      }
      
      .text-block ol li { 
        margin-bottom: 0.75rem; 
        line-height: 1.6;
        color: #374151;
      }
      
      .send-bar { 
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
      
      .send-inner { 
        width: 100%; 
        max-width: 720px; 
        display: flex; 
        gap: 0.5rem; 
      }
      
      .input { 
        flex: 1; 
        padding: 0.75rem 1rem; 
        border-radius: 8px; 
        border: 1px solid #d1d5db; 
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s ease;
      }
      
      .input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .btn { 
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
      
      .btn:hover { 
        background: #1f2937; 
        transform: translateY(-1px);
      }
      
      .btn:active {
        transform: translateY(0);
      }
      
      /* Responsividade */
      @media (max-width: 768px) {
        .app {
          padding: 1rem 0.5rem 100px 0.5rem;
        }
        
        .text-block {
          padding: 1.25rem;
          border-radius: 8px;
        }
        
        .send-bar {
          padding: 0.75rem;
        }
        
        .input, .btn {
          padding: 0.625rem 0.875rem;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.id = 'simple-recipe-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    
    return () => { 
      const el = document.getElementById('simple-recipe-style'); 
      if(el) el.remove(); 
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log('Enviando:', input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <div className="messages">
          <RecipeRenderer recipe={sampleRecipe} />
        </div>
      </div>
      
      <div className="send-bar">
        <div className="send-inner">
          <input 
            className="input" 
            placeholder="Escreva uma mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            data-testid="message-input"
          />
          <button 
            className="btn" 
            onClick={handleSend}
            data-testid="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleRecipeApp;