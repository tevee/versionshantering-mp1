export const handleDarkMode = {
	set: () => {
		const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		console.log(darkMode);

		if (darkMode) {
			console.log("I am dark");
			document.getElementById("toggleMode").checked = true;
		}
	},
	change: (event) => {
		event.preventDefault();
		const darkMode = document.querySelector("#toggleMode").checked;

		if (darkMode) {
			document.documentElement.style.setProperty(
				"--backgroundColor",
				"#2c2f33"
			);
			document.documentElement.style.setProperty("--textColor", "white");
			console.log("off");
		} else {
			document.documentElement.style.setProperty("--backgroundColor", "white");
			document.documentElement.style.setProperty("--textColor", "black");
			console.log("on");
		}
	},
};
