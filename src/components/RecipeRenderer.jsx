import React, { useState } from "react";
import { scaleIngredients } from "../utils/recipeUtils";

function RecipeRenderer({ recipe }) {
  const [servings, setServings] = useState(recipe.servings || 1);
  const scaled = scaleIngredients(recipe.ingredients, recipe.servings || 1, servings);

  return (
    <div className="text-block">
      <h2 className="title" data-testid="recipe-title">
        {recipe.title}
      </h2>
      
      {recipe.author && (
        <div className="author" data-testid="recipe-author">
          por {recipe.author}
        </div>
      )}
      
      <div className="meta" data-testid="recipe-servings">
        Rende:{' '}
        <input 
          type="number" 
          value={servings} 
          min="1" 
          onChange={e => setServings(Number(e.target.value) || 1)} 
          style={{
            width: '4rem',
            padding: '2px 6px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginLeft: '4px',
            marginRight: '4px'
          }}
          data-testid="servings-input"
        />
        porções
      </div>
      
      <h4 data-testid="ingredients-heading">Ingredientes</h4>
      <ul data-testid="ingredients-list">
        {scaled.map((ing, i) => (
          <li key={i} data-testid={`ingredient-${i}`}>
            {ing.amount} {ing.unit} — {ing.name}
          </li>
        ))}
      </ul>
      
      <h4 data-testid="steps-heading">Modo de Preparo</h4>
      <ol data-testid="steps-list">
        {recipe.steps.map((step, i) => (
          <li key={i} data-testid={`step-${i}`}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeRenderer;