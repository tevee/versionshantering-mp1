import {
  getRandomRecipes,
  getRecipesByIngredients,
  getInstructionsFromRecipeById,
  // getRecipesWithComplexSearch
} from "./modules/fetchAPI.js";
import {
  displaySearchedIngredients,
  removePrevIngredientSearch,
  displayError,
  removePrevRecipeSearch,
  displayRecipe,
  displayRecipeByIngredients,
  displayInstructionsForRecipe,
  displayGlutenFreeRecipes,
} from "./modules/display.js";
import { handleTabClick } from "./modules/tabs.js";
import { showSidebar, hideSidebar } from "./modules/hamburger.js";

// eventlistener for tabs
document.querySelector("nav").addEventListener("click", handleTabClick);

//eventlistener for hamburger menu
document.querySelector(".hamburger").addEventListener("click", showSidebar);
document.querySelector(".close").addEventListener("click", hideSidebar);

const contentContainerEl = document.querySelector("#contentContainer");
const ingredientsFormEl = document.querySelector("#getIngredientsForm");
const searchRecipeFormEl = document.querySelector("#searchRecipe");
const storedIngredientsContainerEl = document.querySelector(
  "#storedIngredientsContainer"
);
const themeModeEl = document.querySelector("#themeMode");

const savedResults = {
  ingredients: [],
};

//  getRandomRecipes({ number: 5 })
// 	.then(displayRecipe)
// 	.catch((error) => displayError(error));

// getRecipesWithComplexSearch({diet: 'gluten%20free', number: 5})
// .then(displayGlutenFreeRecipes)
// .catch(error => displayError(error))

themeModeEl.addEventListener("change", (event) => {
  event.preventDefault();
  const checkboxEl = document.querySelector("#toggleMode").checked;
  const allElements = document.querySelectorAll(".toggleFontColor");

  allElements.forEach((element) => {
    if (checkboxEl) {
      document.body.style.background =
        "linear-gradient(0deg,rgb(46, 56, 45) 0%,rgba(144, 144, 144, 0.667) 100%)";
      element.classList.add("darkmode");
      console.log("off");
    } else {
      document.body.style.background =
        "linear-gradient(0deg,rgb(179, 212, 176) 0%,rgba(255, 255, 255, 0.667) 100%)";
      element.classList.remove("darkmode");
      console.log("on");
    }
  });
});

ingredientsFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  removePrevIngredientSearch();
  const inputElValue = document.querySelector(
    "#getIngredientsForm > input"
  ).value;

  savedResults.ingredients.push(inputElValue);
  console.log(savedResults.ingredients);

  displaySearchedIngredients(savedResults);

  ingredientsFormEl.reset();
});

storedIngredientsContainerEl.addEventListener("click", (event) => {
  event.preventDefault();

  savedResults.ingredients.forEach((ingredient) => {
    if (event.target.value === ingredient) {
      const indexOfIngredient = savedResults.ingredients.indexOf(ingredient);
      savedResults.ingredients.splice(indexOfIngredient, 1);
      console.log(savedResults.ingredients);
      event.target.parentElement.remove();
    }
  });
});

searchRecipeFormEl.addEventListener("submit", (event) => {
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
});

contentContainerEl.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.value === "recipeCardBtn") {
    const recipeCardButton = document.getElementById(event.target.id);
    const recipeCardEl = recipeCardButton.parentElement;

    getInstructionsFromRecipeById(event.target.id)
      .then((result) => displayInstructionsForRecipe(result, recipeCardEl))
      .catch((error) => displayError(error));
  } else if (event.target.value === "popUpBtnClose") {
    const popUpWindow = document.querySelector(".popUpDiv");
    popUpWindow.classList.remove("popUpDiv");
    popUpWindow.remove();
  }
});
