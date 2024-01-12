export function handleDarkMode(event) {
    event.preventDefault()
	const checkboxEl = document.querySelector('#toggleMode').checked

	if(checkboxEl) {
		document.documentElement.style.setProperty('--backgroundColor', '#2c2f33')
		document.documentElement.style.setProperty('--textColor', 'white')
	}
	else {
		document.documentElement.style.setProperty('--backgroundColor', 'white')
		document.documentElement.style.setProperty('--textColor', 'black')
	}
}