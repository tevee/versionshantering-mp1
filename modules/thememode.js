export function handleDarkMode(event) {
	const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

	console.log(darkMode);

	event.preventDefault();
	const checkboxEl = document.querySelector("#toggleMode").checked;

	if (checkboxEl) {
		document.documentElement.style.setProperty(
			"--backgroundColor",
			"linear-gradient(0deg,rgb(46, 56, 45) 0%,rgba(144, 144, 144, 0.667) 100%)"
		);
		document.documentElement.style.setProperty("--textColor", "white");
		console.log("off");
	} else {
		document.documentElement.style.setProperty(
			"--backgroundColor",
			"linear-gradient(0deg,rgb(179, 212, 176) 0%,rgba(255, 255, 255, 0.667) 100%)"
		);
		document.documentElement.style.setProperty("--textColor", "black");
		console.log("on");
	}
}
