import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

interface RecipeData {
  title: string;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
}

const TextRenderer: React.FC<{ data: RecipeData | null }> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-64 text-gray-500">
        <div className="text-center">
          <ChefHat className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>Nenhuma receita para exibir</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <div className="flex items-center gap-6 text-blue-100">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{data.servings} {data.servings === 1 ? 'porção' : 'porções'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{Math.max(30, data.steps.length * 8)} min</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Ingredientes */}
        {data.ingredients && data.ingredients.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Ingredientes
            </h2>
            <div className="grid gap-3">
              {data.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-2 h-2 bg-gray-400 group-hover:bg-blue-400 rounded-full mt-3 mr-4 flex-shrink-0 transition-colors"></div>
                  <div className="flex-grow">
                    <span className="font-medium text-gray-900">
                      {ingredient.quantity} {ingredient.unit} de {ingredient.name}
                    </span>
                    {ingredient.notes && (
                      <span className="text-sm text-gray-600 ml-2">
                        ({ingredient.notes})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Modo de Preparo */}
        {data.steps && data.steps.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Modo de Preparo
            </h2>
            <div className="space-y-4">
              {data.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start p-5 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 group-hover:bg-green-600 text-white text-sm font-semibold rounded-full flex items-center justify-center mr-4 transition-colors">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-grow">{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const RecipeViewer: React.FC = () => {
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Dados da receita de exemplo (em produção viria de uma API)
  const sampleRecipe: RecipeData = {
    title: "Bolo de Cenoura",
    servings: 8,
    ingredients: [
      { name: "cenoura", quantity: 250, unit: "g", notes: "descascadas e picadas" },
      { name: "ovos", quantity: 3, unit: "unidade" },
      { name: "óleo vegetal", quantity: 200, unit: "ml" },
      { name: "açúcar", quantity: 250, unit: "g" },
      { name: "farinha de trigo", quantity: 250, unit: "g" },
      { name: "fermento químico", quantity: 12, unit: "g" }
    ],
    steps: [
      "Pré-aqueça o forno a 180°C.",
      "Bata cenouras, ovos e óleo no liquidificador.",
      "Misture açúcar e farinha em uma tigela.",
      "Incorpore a mistura do liquidificador aos secos.",
      "Adicione fermento e misture delicadamente.",
      "Despeje em forma untada e asse por 40-45 minutos."
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simula carregamento
        await new Promise(resolve => setTimeout(resolve, 800));
        setRecipeData(sampleRecipe);
      } catch (error) {
        console.error('Erro ao carregar receita:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando receita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header fixo */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Voltar ao Chat</span>
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">Visualizador de Receitas</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Renderizador dinâmico de receitas com design moderno
            </p>
          </div>
          
          <TextRenderer data={recipeData} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Integrado ao ChatNeural • React + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default RecipeViewer;