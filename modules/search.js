import {
	getRecipesByIngredients,
	getInstructionsFromRecipeById
} from "./fetchAPI.js";
import {
  displaySearchedIngredients,
  removePrevIngredientSearch,
  displayError,
  removePrevRecipeSearch,
  displayRecipeByIngredients,
  displayInstructionsForRecipe,
} from "./display.js";

const ingredientsFormEl = document.querySelector("#getIngredientsForm");
const searchRecipeFormEl = document.querySelector("#searchRecipe");

const savedResults = {
    ingredients: [],
  };

export function handleGetAndDisplayIngredients(event) {
    event.preventDefault();
    removePrevIngredientSearch();
    const inputElValue = document.querySelector("#getIngredientsForm > input").value;

    savedResults.ingredients.push(inputElValue);

    displaySearchedIngredients(savedResults);

    ingredientsFormEl.reset();
}

export function handleRemoveDisplayedIngredients(event) {
    event.preventDefault();

    savedResults.ingredients.forEach((ingredient) => {
        if (event.target.value === ingredient) {
        const indexOfIngredient = savedResults.ingredients.indexOf(ingredient);
        savedResults.ingredients.splice(indexOfIngredient, 1);
        event.target.parentElement.remove();
        }
  });
}

export function handleGetRecipesByIngredients(event) {
    event.preventDefault();

    if (savedResults.ingredients.length !== 0) {
    const displaySearchedIngredientsEl = searchRecipeFormEl.nextElementSibling;
    displaySearchedIngredientsEl.innerText = `Searched Ingredients: ${savedResults.ingredients}`;

    getRecipesByIngredients(savedResults)
      .then((results) => {
        removePrevIngredientSearch();
        removePrevRecipeSearch();
        savedResults.ingredients = [];
        displayRecipeByIngredients(results);
      })
      .catch((error) => {
        displaySearchedIngredientsEl.innerText = "";
        savedResults.ingredients = [];
        displayError(error);
      });
  }
}

export function handlePopUpInstructions(event) {
    event.preventDefault();

    if (event.target.value === "recipeCardBtn") {
        const recipeCardButton = document.getElementById(event.target.id);
        const recipeCardEl = recipeCardButton.parentElement;

        getInstructionsFromRecipeById(event.target.id)
        .then((result) => displayInstructionsForRecipe(result, recipeCardEl))
        .catch((error) => displayError(error));
    }
    else if (event.target.value === "popUpBtnClose") {
        const popUpWindow = document.querySelector(".popUpDiv");
        popUpWindow.classList.remove("popUpDiv");
        popUpWindow.remove();
    }
}