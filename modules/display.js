import { createStoredIngredientsEl, createAndAppendElement } from "./createElement.js";

export function displaySearchedIngredients(savedResultObj) {

    for(const ingredient of savedResultObj.ingredients) {
        createStoredIngredientsEl(ingredient)
    }
}

export function removePrevRecipeSearch() {
    const contentContainerEl = document.querySelector('#contentContainer');
    contentContainerEl.innerHTML = '';
}

export function removePrevIngredientSearch() {
    const storedIngredientsContainerEl = document.querySelector('#storedIngredientsContainer');
    storedIngredientsContainerEl.innerHTML = '';
}

export function displayError(error) {
    removePrevIngredientSearch();
    removePrevRecipeSearch();
    const h2El = document.createElement('h2');
    const contentContainer = document.querySelector('#contentContainer')
    const discoverContainer = document.querySelector('#discoverContainer');
    if (error === 'emptyArray'){
        h2El.innerText= `No results found. Check if your spelling is correct and try again!`;
        contentContainer.append(h2El);
    }
    else if( error === 'no recipes'){
        h2El.innerText = 'No recipes found';
        discoverContainer.append(h2El);
    }
    else h2El.innerText = `Something went wrong. Try again later!`;
        
}

export function displayRecipe(data) {
    const discoverContainer = document.querySelector('#discoverContainer');
console.log(data);
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

export function displayRecipeByIngredients(data){
    const contentContainer = document.querySelector('#contentContainer');
    
    for (const recipe of data) {
        const recipeCard = createAndAppendElement('div', '', contentContainer)
        recipeCard.classList.add('recipe-card')
  
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
