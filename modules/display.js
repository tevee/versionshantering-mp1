import { createStoredIngredientsEl, createAndAppendElement } from "./createElement.js";

export function displaySearchedIngredients(savedResultObj) {

    for(const ingredient of savedResultObj.ingredients) {
        createStoredIngredientsEl(ingredient)
    }
}

export function removePrevIngredientSearch() {
    const storedIngredientsContainerEl = document.querySelector('#storedIngredientsContainer');
    storedIngredientsContainerEl.innerHTML = '';
}




export function displayRecipe(data) {
    const discoverContainer = document.querySelector('#discoverContainer');

    for (const recipe of data.recipes) {
    
        const gridItemEl = createAndAppendElement('div', '', discoverContainer);
        gridItemEl.classList.add('gridItem')
        gridItemEl.classList.add('image')
       
        createAndAppendElement('img', recipe.image, gridItemEl);
    
    }
}

/* Ska användas till sökfunktion under recipe, används inte just nu */
export function displayRandomRecipe(data) {
    const contentContainer = document.querySelector('#contentContainer');

    for (const recipe of data.recipes) {
        const recipeCard = document.querySelector('#recipeCards');

        createAndAppendElement('img', recipe.image, recipeCard);
        createAndAppendElement('h1', recipe.title, recipeCard);
        createAndAppendElement('h3', 'Ingredients:', recipeCard);

        for (const ingredient of recipe.extendedIngredients) {
            createAndAppendElement('p', ingredient.original, recipeCard);
        }

        createAndAppendElement('p', recipe.instructions, recipeCard);

        contentContainer.append(recipeCard);
    }
}
/* Ska användas till sökfunktion under recipe, används inte just nu */
export function displayRecipeByIngredients(data){
    const contentContainer = document.querySelector('#contentContainer');
    
    for (const recipe of data) {
        const recipeCard = document.querySelector('#recipeCards');
  
        createAndAppendElement('img', recipe.image, recipeCard);
        createAndAppendElement('h1', recipe.title, recipeCard);
        createAndAppendElement('h3', 'Ingredients:', recipeCard);
  
        for (const ingredient of recipe.missedIngredients) {
            createAndAppendElement('p', ingredient.original, recipeCard);
        }
  
        for(const ingredient of recipe.usedIngredients){
            createAndAppendElement('p', ingredient.original, recipeCard);
        }
  
  
        contentContainer.append(recipeCard);
    }
  
  }