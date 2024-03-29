import {
	createStoredIngredientsEl,
	createAndAppendElement,
	createInstructionsForRecipe,
} from "./createElement.js";

export function displaySearchedIngredients(savedResultObj) {
	for (const ingredient of savedResultObj.ingredients) {
		createStoredIngredientsEl(ingredient);
	}
}

export function removePrevRecipeSearch() {
	const contentContainerEl = document.querySelector("#contentContainer");
	contentContainerEl.classList.remove("add-border");
	contentContainerEl.classList.add("remove-border");
	contentContainerEl.innerHTML = "";
}

export function removePrevIngredientSearch() {
	const storedIngredientsContainerEl = document.querySelector(
		"#storedIngredientsContainer"
	);
	storedIngredientsContainerEl.innerHTML = "";
}

export function displayError(error) {
	console.log(error);
	removePrevIngredientSearch();
	removePrevRecipeSearch();
	const h2El = document.createElement("h2");
	const errorContainer = document.querySelector("#displayError");
	errorContainer.innerHTML = "";

	if (error === "emptyArray")
		h2El.innerText = `No results found. Check if your spelling is correct and try again!`;
	else if (error === "no recipes") h2El.innerText = "No recipes found";
	else h2El.innerText = `Something went wrong. Try again later!`;

	errorContainer.append(h2El);
}

export function displayRecipe(data, id) {
	const section = document.getElementById(id);

	for (const recipe of data.recipes) {
		const gridItemEl = createAndAppendElement("div", "", section);
		gridItemEl.classList.add("gridItem");
		gridItemEl.classList.add("image");
		createAndAppendElement("img", recipe.image, gridItemEl);
		createAndAppendElement("h2", recipe.title, gridItemEl);
	}
}

/* Ska användas till sökfunktion under recipe, används inte just nu */
export function displayRandomRecipe(data) {
	const contentContainer = document.querySelector("#contentContainer");

	for (const recipe of data.recipes) {
		const recipeCard = document.querySelector("#recipeCards");

		createAndAppendElement("img", recipe.image, recipeCard);
		createAndAppendElement("h1", recipe.title, recipeCard);
		createAndAppendElement("h3", "Ingredients:", recipeCard);

		for (const ingredient of recipe.extendedIngredients) {
			createAndAppendElement("p", ingredient.original, recipeCard);
		}

		createAndAppendElement("p", recipe.instructions, recipeCard);

		contentContainer.append(recipeCard);
	}
}

export function displayRecipeByIngredients(data) {
	const contentContainer = document.querySelector("#contentContainer");
	contentContainer.classList.add("add-border");
	contentContainer.classList.remove("remove-border");

	for (const recipe of data) {
		const recipeCard = createAndAppendElement("div", "", contentContainer);
		recipeCard.classList.add("recipe-card");

		createAndAppendElement("img", recipe.image, recipeCard);
		createAndAppendElement("h2", recipe.title, recipeCard);
		createAndAppendElement("h3", "Ingredients:", recipeCard);

		for (const ingredient of recipe.missedIngredients) {
			createAndAppendElement("p", ingredient.original, recipeCard);
		}

		for (const ingredient of recipe.usedIngredients) {
			createAndAppendElement("p", ingredient.original, recipeCard);
		}
		const recipeCardBtn = createAndAppendElement(
			"button",
			"Get instructions",
			recipeCard
		);
		recipeCardBtn.classList.add("recipeCardBtn");
		recipeCardBtn.id = recipe.id;
		recipeCardBtn.value = "recipeCardBtn";
		contentContainer.append(recipeCard);
	}
}

export function displayInstructionsForRecipe(recipeArr, container) {
	const recipeStepsArr = recipeArr[0].steps;
	const popUpDiv = createAndAppendElement("div", "", container);
	popUpDiv.classList.add("popUpDiv");

	createAndAppendElement("h3", "Instructions:", popUpDiv);

	recipeStepsArr.forEach((recipe) => {
		console.log(recipe.step);
		createInstructionsForRecipe(recipe.step, popUpDiv);
	});
	const popUpButton = createAndAppendElement("button", "Close", popUpDiv);
	popUpButton.classList.add("popUpButton");
	popUpButton.value = "popUpBtnClose";
}
