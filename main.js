import { displayRecipe, displayError } from "./modules/display.js";
import { getRandomRecipes } from "./modules/fetchAPI.js";
import { handleTabClick } from "./modules/tabs.js";
import { showSidebar, hideSidebar } from "./modules/hamburger.js";
import {
	handleGetAndDisplayIngredients,
	handleRemoveDisplayedIngredients,
	handleGetRecipesByIngredients,
	handlePopUpInstructions,
} from "./modules/search.js";
import { handleDarkMode } from "./modules/thememode.js";

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

const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

console.log(darkMode);

if (darkMode) {
	console.log("I am dark");
	document.getElementById("toggleMode").checked = true;
}

// getRandomRecipes({ number: 5 })
// 	.then((data) => {
// 		displayRecipe(data, "discoverRandom");
// 	})
// 	.catch((error) => displayError(error));

// getRandomRecipes({ excludeTags: "gluten", number: 5 })
// 	.then((data) => {
// 		displayRecipe(data, "discoverVegan");
// 	})
// 	.catch((error) => displayError(error));

ingredientsFormEl.addEventListener("submit", handleGetAndDisplayIngredients);
storedIngredientsContainerEl.addEventListener(
	"click",
	handleRemoveDisplayedIngredients
);
searchRecipeFormEl.addEventListener("submit", handleGetRecipesByIngredients);
contentContainerEl.addEventListener("click", handlePopUpInstructions);
themeModeEl.addEventListener("change", handleDarkMode);
