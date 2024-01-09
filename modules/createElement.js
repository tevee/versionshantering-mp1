export function createStoredIngredientsEl(ingredient) {
    const storedIngredientsContainerEl = document.querySelector('#storedIngredientsContainer')

    const divEl = document.createElement('div')
    divEl.classList.add('storedIngredientsWrapper')

    const pEl = document.createElement('p')
    pEl.innerText = ingredient

    const button = document.createElement('button')
    button.innerText = 'remove'
    button.value = ingredient

    divEl.append(pEl, button)
    storedIngredientsContainerEl.append(divEl)
}