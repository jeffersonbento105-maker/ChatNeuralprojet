/**
 * Recipe processing utilities for scaling ingredients and calculations
 */

/**
 * Scale ingredient amounts based on servings
 * @param {Array} ingredients - Array of ingredient objects with amount, unit, name
 * @param {number} originalServings - Original number of servings
 * @param {number} newServings - Target number of servings
 * @returns {Array} - Scaled ingredients array
 */
export function scaleIngredients(ingredients, originalServings, newServings) {
  if (!Array.isArray(ingredients) || !originalServings || originalServings === 0) {
    return ingredients || [];
  }
  
  const factor = newServings / originalServings;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    amount: Math.round((ingredient.amount * factor) * 10) / 10
  }));
}

/**
 * Calculate estimated cooking time based on recipe steps
 * @param {Array} steps - Array of recipe steps
 * @returns {number} - Estimated time in minutes
 */
export function estimateCookingTime(steps) {
  if (!Array.isArray(steps)) return 0;
  
  let totalTime = steps.length * 5; // Base 5 minutes per step
  
  steps.forEach(step => {
    const timeMatch = step.match(/(\d+)[\s-]*(?:minutos?|mins?)/i);
    if (timeMatch) {
      totalTime += parseInt(timeMatch[1]);
    }
  });
  
  return totalTime;
}

/**
 * Validate recipe data structure
 * @param {Object} recipe - Recipe object to validate
 * @returns {boolean} - True if valid recipe structure
 */
export function validateRecipe(recipe) {
  if (!recipe || typeof recipe !== 'object') return false;
  
  return !!(
    recipe.title &&
    Array.isArray(recipe.ingredients) &&
    Array.isArray(recipe.steps) &&
    recipe.ingredients.length > 0 &&
    recipe.steps.length > 0
  );
}

/**
 * Format ingredient for display
 * @param {Object} ingredient - Ingredient object with amount, unit, name
 * @returns {string} - Formatted ingredient string
 */
export function formatIngredient(ingredient) {
  if (!ingredient || typeof ingredient !== 'object') return '';
  
  const { amount = 0, unit = '', name = '' } = ingredient;
  return `${amount} ${unit} — ${name}`.trim();
}