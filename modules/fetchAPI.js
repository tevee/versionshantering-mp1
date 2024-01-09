const API_KEY = "&apiKey=8aecc0a91be54e3c9cc4bfe9d6d468f2";
const BASE_URL = "https://api.spoonacular.com/recipes/";

//  WIKI INFO
// API:
// random recipe
// parameters:include-tags,exlude-tags,number(=10, 1-100)

// by ingredient
// parameters: ingredients, number(=10, 1-100), limitLicense, ranking (1 || 2), ignorePantry (bool)

// EXPORT FUNCTIONS
export function getRandomRecipe(filters) {
	const END_POINT = "random";

	const URL = generateURL(END_POINT, filters);

	return fetchData(URL);
}

export function getRecipesByIngredient(filters) {
	const END_POINT = "findByIngredients";

	if (!filters || !filters.ingredients) {
		throw new Error(
			'Developer Error: "ingredients" is required as a key in the provided object'
		);
	}

	const URL = generateURL(END_POINT, filters);

	return fetchData(URL);
}

// API COMMUNICATION
async function fetchData(url) {
	console.log(url);
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		return data;
	} catch {
		throw error;
	}
}

// HELPER FUNCTIONS
function generateURL(endpoint, filters) {
	const FILTER_PARAMS = getFilterString(filters);
	return BASE_URL + endpoint + FILTER_PARAMS + API_KEY;
}

function getFilterString(filtersObj) {
	let filterString = "?";

	if (filtersObj) {
		for (const [filter, value] of Object.entries(filtersObj)) {
			const filterKey = addDashSeparator(filter);
			filterString += filterKey + "=" + value + "&";
		}

		//removes last "&"
		filterString = filterString.slice(0, -1);
	}

	return filterString;
}

function addDashSeparator(string) {
	return string
		.split(/(?=[A-Z])/)
		.join("-")
		.toLowerCase();
}

// TESTING
const obj1 = {
	includeTags: "vegetarian,dessert",
	// excludeTags: "dairy",
	number: 3,
};

const obj2 = {
	includeTags: "vegetarian,dessert",
	// excludeTags: "dairy",
	number: 3,
	ingredients: "sugar,+apples,+cinnamon",
};

const obj3 = {
	// includeTags: "dessert",
	ranking: 1,
	number: 10,
	limitLicense: true,
	ingredients: "sugar,+apples,+cinnamon",
};

// getRandomRecipe(obj1);

// getRecipesByIngredient(obj3);
