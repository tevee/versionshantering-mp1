import { createStoredIngredientsEl } from "./createElement.js";

export function displaySearchedIngredients(savedResultObj) {

    for(const ingredient of savedResultObj.ingredients) {
        createStoredIngredientsEl(ingredient)
    }
}

export function removePrevIngredientSearch() {
    const storedIngredientsContainerEl = document.querySelector('#storedIngredientsContainer');
    storedIngredientsContainerEl.innerHTML = '';
}