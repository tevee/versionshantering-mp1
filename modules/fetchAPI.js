// EXPORT FUNCTIONS
export function getRandomRecipes(filters) {
	const END_POINT = "random";

	const URL = generateURL(END_POINT, filters);

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
	return fetchData(URL);
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

export function getInstructionsFromRecipeById(id) {
	const END_POINT = "/analyzedInstructions?";

	const URL = generateURL(END_POINT, "", id);

	return fetchData(URL);
}

// API COMMUNICATION
export async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();

	if (response.ok && data.length > 0) return data;
	else if (data === undefined || data.length == 0) throw "emptyArray";
	else if (response.ok && data.recipes.length > 0) return data;
	else if (data.recipes.length === 0) throw "no recipes";
	else throw "error";
}

// HELPER FUNCTIONS
function generateURL(endpoint, filters, id) {
	// const API_KEY = "&apiKey=8aecc0a91be54e3c9cc4bfe9d6d468f2";
	// 1cc618fa1481485e84da702af0191634 - Thiens API KEY
	// 83d78591f91c440ead2234603cffd6c3 - Amandas API KEY
	// deec58bb0fe24310940e44c32d429a87 - Andréas API KEY
	// 543d189d1b144ef6899166c18c08621f - Elvira API KEY
	const API_KEY = "&apiKey=deec58bb0fe24310940e44c32d429a87";
	const BASE_URL = "https://api.spoonacular.com/recipes/";
	const FILTER_PARAMS = getFilterString(filters);

	if (id !== undefined) {
		const newAPI_KEY = API_KEY.substring(1);
		return BASE_URL + id + endpoint + newAPI_KEY;
	} else return BASE_URL + endpoint + FILTER_PARAMS + API_KEY;
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
