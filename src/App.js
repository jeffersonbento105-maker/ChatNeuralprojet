import React, { useState, useEffect } from "react";
import TextRenderer from "./components/TextRenderer";
import ChatPlayground from "./components/ChatPlayground";
import SendBar from "./components/SendBar";
import sampleData from "./data/sample.json";
import "./styles/styles.css";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Load sample data on mount
    setItems([
      { role: 'assistant', data: sampleData.text },
      { role: 'assistant', data: sampleData.recipe }
    ]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    try {
      const parsed = JSON.parse(input);
      setItems(prev => [...prev, { role: 'user', data: parsed }]);
      alert('JSON válido adicionado!');
    } catch (e) {
      setItems(prev => [...prev, { 
        role: 'user', 
        data: { 
          title: "Mensagem do Usuário",
          content: [input] 
        }
      }]);
    }
    setInput('');
  };

  const REPLIT_PROMPT = `Replit AI — Instruções detalhadas para recriar o front-end:

1) Apague arquivos duplicados (App.js antigo, index.js antigo) mantendo package.json e node_modules.
2) Crie um arquivo src/App.js com o conteúdo que eu vou colar (o intuito: um single-file React app que renderiza JSON limpo). Use apenas CSS leve; NÃO alterar as cores originais do projeto sem autorização.
3) Layout: conter um container central (max-width ~720px), fundo cinza-claro, caixas brancas com sombra suave para mensagens, barra de envio fixa no rodapé (comportamento igual ao ChatGPT: fixa, não se move com o conteúdo), campo de input e botão Send.
4) Implementar TextRenderer que aceita JSON limpo (title, author, content[]) e também estrutura de receitas (ingredients[], steps[], servings) — converter e escalar receitas conforme a entrada do usuário.
5) Fornecer sample.json em src/data/sample.json com dois exemplos (texto genérico e receita), e garantir que ao rodar a aplicação, esses exemplos apareçam no playground.
6) Não alterar fontes e cores base do projeto sem pedir aprovação. Use CSS leve e responsivo.

Observação: este prompt cria apenas front-end. Não mexer nos endpoints backend. Forneça instruções de como rodar: npm install && npm start.`;

  return (
    <div className="app">
      <div className="container">
        <div className="chat-window">
          <ChatPlayground items={items} />

          <div className="prompt-area">
            <button 
              onClick={() => setShowPrompt(s => !s)} 
              className="btn"
              data-testid="toggle-prompt"
            >
              {showPrompt ? 'Esconder' : 'Mostrar'} prompt Replit
            </button>
            
            {showPrompt && (
              <div style={{marginTop:'.75rem'}}>
                <textarea 
                  readOnly 
                  value={REPLIT_PROMPT} 
                  style={{
                    width:'100%',
                    height:200,
                    padding:10,
                    fontFamily:'monospace',
                    border:'1px solid #ddd',
                    borderRadius:'6px'
                  }}
                  data-testid="prompt-textarea"
                />
                <div style={{marginTop:8, color:'#666'}}>
                  Copie esse texto e cole no assistente AI do Replit (ou salve como replit-prompt.txt).
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SendBar 
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

export default App;