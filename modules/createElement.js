export function createAndAppendElement(type, content, container){
    const element = document.createElement(type);
    container.append(element);

    if(type === 'img') element.src = content;
    else element.innerText = content;

    return element;
}

export function createStoredIngredientsEl(ingredient) {
    const storedIngredientsContainerEl = document.querySelector('#storedIngredientsContainer')

    const divEl = createAndAppendElement('div', '', storedIngredientsContainerEl)
    divEl.classList.add('storedIngredientsWrapper')

    createAndAppendElement('p', ingredient, divEl)

    const button = createAndAppendElement('button', 'X', divEl)
    button.value = ingredient
}

export function createInstructionsForRecipe(steps, container) {
    
    createAndAppendElement('p', steps, container) 
    
}

export function createGlutenFreeRecipesEl(recipe) {
    const discoverContainerEl = document.querySelector('#discoverContainer');

    const gridItemEl = createAndAppendElement('div', '', discoverContainerEl)
    gridItemEl.classList.add('gridItem')
    gridItemEl.classList.add('image')

    createAndAppendElement('img', recipe.image, gridItemEl)
    createAndAppendElement('h2', recipe.title, gridItemEl)
}