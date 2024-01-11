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

// getRandomRecipes({ includeTags: "vegan", number: 5 })
// 	.then((data) => {
// 		displayRecipe(data, "discoverGlutenFree");
// 	})
// 	.catch((error) => displayError(error));

themeModeEl.addEventListener("change", (event) => {
	event.preventDefault();
	const checkboxEl = document.querySelector("#toggleMode").checked;

	if (checkboxEl) {
		document.documentElement.style.setProperty("--backgroundColor", "black");
		document.documentElement.style.setProperty("--textColor", "white");
		console.log("off");
	} else {
		document.documentElement.style.setProperty("--backgroundColor", "inherit");
		document.documentElement.style.setProperty("--textColor", "inherit");
		console.log("on");
	}
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
