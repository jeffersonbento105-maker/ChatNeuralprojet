import React from 'react';

const TextRenderer = ({ data }) => {
  if (!data) {
    return <div className="text-gray-500">Nenhum conteúdo para exibir</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Título */}
      {data.title && (
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {data.title}
        </h1>
      )}
      
      {/* Porções */}
      {data.servings && (
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm font-medium text-blue-800">
            Porções: {data.servings} {data.servings === 1 ? 'pessoa' : 'pessoas'}
          </span>
        </div>
      )}

      {/* Ingredientes */}
      {data.ingredients && data.ingredients.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Ingredientes
          </h2>
          <ul className="space-y-2">
            {data.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
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
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modo de Preparo */}
      {data.steps && data.steps.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Modo de Preparo
          </h2>
          <ol className="space-y-3">
            {data.steps.map((step, index) => (
              <li key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white text-sm font-medium rounded-full flex items-center justify-center mr-4 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Renderização genérica de outros campos */}
      {Object.entries(data).map(([key, value]) => {
        if (['title', 'servings', 'ingredients', 'steps'].includes(key)) return null;
        
        if (typeof value === 'string') {
          return (
            <div key={key} className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <p className="text-gray-700 leading-relaxed">{value}</p>
            </div>
          );
        }
        
        if (Array.isArray(value)) {
          return (
            <div key={key} className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <ul className="space-y-1">
                {value.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    {typeof item === 'object' ? JSON.stringify(item) : item}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default TextRenderer;