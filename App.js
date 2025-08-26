import React, { useState, useEffect } from 'react';
import TextRenderer from './components/TextRenderer.jsx';
import sampleData from './data/sample.json';
import './styles/style.css';

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento dos dados
    const loadData = async () => {
      try {
        setLoading(true);
        // Em uma aplicação real, você faria uma requisição HTTP aqui
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay
        setRecipeData(sampleData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando receita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Visualizador de Receitas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renderizador dinâmico de conteúdo estruturado com React e Tailwind CSS
          </p>
        </header>
        
        <main>
          <TextRenderer data={recipeData} />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Criado com React, Tailwind CSS e muito ❤️</p>
        </footer>
      </div>
    </div>
  );
}

export default App;