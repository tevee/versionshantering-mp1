import { getRandomRecipes, getRecipesByIngredients, fetchData } from "./modules/fetchAPI.js"
import { displaySearchedIngredients, removePrevIngredientSearch } from "./modules/display.js"

const ingredientsFormEl = document.querySelector('#getIngredientsForm')
const searchRecipeFormEl = document.querySelector('#searchRecipe')
const storedIngredientsContainerEl = document.querySelector('#storedIngredientsContainer')

const savedResults = {
    ingredients: [],
}

ingredientsFormEl.addEventListener('submit', event => {
    event.preventDefault();
    removePrevIngredientSearch();
    const inputElValue = document.querySelector('#getIngredientsForm > input').value

    savedResults.ingredients.push(inputElValue);
    console.log(savedResults.ingredients);

    displaySearchedIngredients(savedResults)

    ingredientsFormEl.reset()
})

storedIngredientsContainerEl.addEventListener('click', event => {
    event.preventDefault();

    savedResults.ingredients.forEach(ingredient => {
        if(event.target.value === ingredient) {
            const indexOfIngredient = savedResults.ingredients.indexOf(ingredient);
            savedResults.ingredients.splice(indexOfIngredient, 1);
            event.target.parentElement.remove();

        }
    })
})

searchRecipeFormEl.addEventListener('submit', event => {
    event.preventDefault();

    getRecipesByIngredients(savedResults)
})
