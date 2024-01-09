import {getRandomRecipes,getRecipesByIngredients} from "./modules/fetchAPI.js";
import {displaySearchedIngredients,removePrevIngredientSearch, removePrevRecipeSearch, displayRecipe, displayRecipeByIngredients} from "./modules/display.js";
import { handleTabClick } from "./modules/tabs.js";

// eventlistener for tabs
document.querySelector("nav").addEventListener("click", handleTabClick);

const ingredientsFormEl = document.querySelector("#getIngredientsForm");
const searchRecipeFormEl = document.querySelector("#searchRecipe");
const storedIngredientsContainerEl = document.querySelector("#storedIngredientsContainer");

const savedResults = {
	ingredients: [],
};

getRandomRecipes({number:5})
.then(displayRecipe)
.catch(error => console.log(error))

ingredientsFormEl.addEventListener("submit", (event) => {
	event.preventDefault();
	removePrevIngredientSearch();
	const inputElValue = document.querySelector("#getIngredientsForm > input").value;

	savedResults.ingredients.push(inputElValue);
	console.log(savedResults.ingredients);

	displaySearchedIngredients(savedResults);

	ingredientsFormEl.reset();
});

storedIngredientsContainerEl.addEventListener("click", (event) => {
	event.preventDefault();

    savedResults.ingredients.forEach(ingredient => {
        if(event.target.value === ingredient) {
            const indexOfIngredient = savedResults.ingredients.indexOf(ingredient);
            savedResults.ingredients.splice(indexOfIngredient, 1);
            console.log(savedResults.ingredients);
            event.target.parentElement.remove();
        }
    })
})

searchRecipeFormEl.addEventListener('submit', event => {
    event.preventDefault();
    
    getRecipesByIngredients(savedResults)
    .then(results => {
        removePrevIngredientSearch();
        removePrevRecipeSearch();
        savedResults.ingredients = [];
        console.log(savedResults.ingredients);
        displayRecipeByIngredients(results)
    })
    .catch(error => console.log(error))
})
