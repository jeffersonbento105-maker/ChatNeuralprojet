/**
 * Utilitários para manipulação de receitas e dados estruturados
 */

/**
 * Valida se os dados de receita estão no formato correto
 * @param {Object} data - Dados da receita
 * @returns {boolean} - True se válido, false caso contrário
 */
export const validateRecipeData = (data) => {
  if (!data || typeof data !== 'object') return false;
  
  // Validações opcionais mas recomendadas
  const validFields = ['title', 'servings', 'ingredients', 'steps'];
  const hasValidStructure = Object.keys(data).some(key => validFields.includes(key));
  
  return hasValidStructure;
};

/**
 * Formata ingredientes para exibição legível
 * @param {Array} ingredients - Lista de ingredientes
 * @returns {Array} - Ingredientes formatados
 */
export const formatIngredients = (ingredients) => {
  if (!Array.isArray(ingredients)) return [];
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    displayText: `${ingredient.quantity} ${ingredient.unit} de ${ingredient.name}${
      ingredient.notes ? ` (${ingredient.notes})` : ''
    }`
  }));
};

/**
 * Calcula tempo total estimado baseado no número de passos
 * @param {Array} steps - Lista de passos
 * @returns {number} - Tempo estimado em minutos
 */
export const estimateCookingTime = (steps) => {
  if (!Array.isArray(steps)) return 0;
  
  // Estimativa básica: 5 minutos por passo + tempo extra para passos que mencionam tempo
  let totalTime = steps.length * 5;
  
  steps.forEach(step => {
    const timeMatch = step.match(/(\d+)[\s-]*(?:minutos?|mins?)/i);
    if (timeMatch) {
      totalTime += parseInt(timeMatch[1]);
    }
  });
  
  return totalTime;
};

/**
 * Converte unidades de medida
 * @param {number} quantity - Quantidade
 * @param {string} fromUnit - Unidade original  
 * @param {string} toUnit - Unidade desejada
 * @returns {number} - Quantidade convertida
 */
export const convertUnits = (quantity, fromUnit, toUnit) => {
  const conversions = {
    'g': { 'kg': 0.001, 'mg': 1000 },
    'kg': { 'g': 1000, 'mg': 1000000 },
    'ml': { 'l': 0.001, 'cl': 0.1 },
    'l': { 'ml': 1000, 'cl': 100 },
    'xícara': { 'ml': 240, 'l': 0.24 },
    'colher de sopa': { 'ml': 15, 'colher de chá': 3 },
    'colher de chá': { 'ml': 5, 'colher de sopa': 0.33 }
  };
  
  if (fromUnit === toUnit) return quantity;
  
  const conversion = conversions[fromUnit]?.[toUnit];
  return conversion ? quantity * conversion : quantity;
};

/**
 * Ajusta porções da receita
 * @param {Object} recipe - Dados da receita
 * @param {number} newServings - Nova quantidade de porções
 * @returns {Object} - Receita ajustada
 */
export const adjustServings = (recipe, newServings) => {
  if (!recipe.servings || newServings <= 0) return recipe;
  
  const multiplier = newServings / recipe.servings;
  
  return {
    ...recipe,
    servings: newServings,
    ingredients: recipe.ingredients?.map(ingredient => ({
      ...ingredient,
      quantity: Math.round((ingredient.quantity * multiplier) * 100) / 100
    })) || []
  };
};

/**
 * Gera lista de compras baseada nos ingredientes
 * @param {Array} ingredients - Lista de ingredientes
 * @returns {Array} - Lista de compras organizada
 */
export const generateShoppingList = (ingredients) => {
  if (!Array.isArray(ingredients)) return [];
  
  const categories = {
    'verduras': ['cenoura', 'cebola', 'alho', 'tomate'],
    'laticínios': ['leite', 'queijo', 'manteiga', 'iogurte'],
    'grãos': ['arroz', 'feijão', 'lentilha'],
    'carnes': ['carne', 'frango', 'peixe'],
    'outros': []
  };
  
  const shoppingList = {};
  
  ingredients.forEach(ingredient => {
    let category = 'outros';
    for (const [cat, items] of Object.entries(categories)) {
      if (items.some(item => ingredient.name.toLowerCase().includes(item))) {
        category = cat;
        break;
      }
    }
    
    if (!shoppingList[category]) shoppingList[category] = [];
    shoppingList[category].push(ingredient);
  });
  
  return shoppingList;
};

/**
 * Busca receitas similares baseado em ingredientes
 * @param {Array} ingredients - Ingredientes da receita atual
 * @param {Array} recipeDatabase - Base de dados de receitas
 * @returns {Array} - Receitas similares ordenadas por relevância
 */
export const findSimilarRecipes = (ingredients, recipeDatabase) => {
  if (!Array.isArray(ingredients) || !Array.isArray(recipeDatabase)) return [];
  
  const currentIngredients = ingredients.map(ing => ing.name.toLowerCase());
  
  return recipeDatabase.map(recipe => {
    if (!recipe.ingredients) return { ...recipe, similarity: 0 };
    
    const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
    const commonIngredients = currentIngredients.filter(ing => 
      recipeIngredients.includes(ing)
    );
    
    const similarity = commonIngredients.length / Math.max(currentIngredients.length, recipeIngredients.length);
    
    return { ...recipe, similarity };
  })
  .filter(recipe => recipe.similarity > 0)
  .sort((a, b) => b.similarity - a.similarity);
};