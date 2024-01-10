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
