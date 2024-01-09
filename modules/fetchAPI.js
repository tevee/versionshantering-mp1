// EXPORT FUNCTIONS
export function getRandomRecipes(filters) {
	const END_POINT = "random";

	const URL = generateURL(END_POINT, filters);
	console.log(URL);

	return fetchData(URL);
}

export function getRecipesByIngredients(filters) {
	const END_POINT = "findByIngredients";

	if (!filters || !filters.ingredients) {
		throw new Error(
			'Developer Error: "ingredients" is required as a key in the provided object'
		);
	}

	const URL = generateURL(END_POINT, filters);
	console.log(URL);

	return fetch(URL);
}

export function getRecipesByIngredientsExtended(filters) {
	getRecipesByIngredients(filters)
		.then((r) => r.json())
		.then((recipes) => {
			const ids = recipes.map((r) => r.id).join(",");

			return getRecipesInformation({ ids });
		});
}

export function getRecipesInformation(ids) {
	const END_POINT = "informationBulk";

	const URL = generateURL(END_POINT, ids);

	return fetchData(URL);
}

// API COMMUNICATION
export async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch {
		throw error;
	}
}

// HELPER FUNCTIONS
function generateURL(endpoint, filters) {
	// const API_KEY = "&apiKey=8aecc0a91be54e3c9cc4bfe9d6d468f2";
	const API_KEY = "&apiKey=1cc618fa1481485e84da702af0191634";
	const BASE_URL = "https://api.spoonacular.com/recipes/";
	const FILTER_PARAMS = getFilterString(filters);

	return BASE_URL + endpoint + FILTER_PARAMS + API_KEY;
}

function getFilterString(filters) {
	let filterString = "?";

	if (filters) {
		for (const [filter, value] of Object.entries(filters)) {
			const filterKey = convertCamelToKebab(filter);
			filterString += filterKey + "=" + value + "&";
		}

		//removes last "&"
		filterString = filterString.slice(0, -1);
	}

	return filterString;
}

function convertCamelToKebab(string) {
	return string
		.split(/(?=[A-Z])/)
		.join("-")
		.toLowerCase();
}
