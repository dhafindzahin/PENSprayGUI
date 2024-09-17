/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["index.html"],
	theme: {
		screens: {
			desktop: "1024px",
			tablet: "768px",
		},
		colors: {
			primary: "hsl(87, 97%, 25%)",
			secondary: "hsl(30, 86%, 49%)",
			white: "#fff",
			black: "hsl(220, 3%, 19%)",
			gray: "hsl(224, 9%, 24%)",
		},
		fontFamily: {
			inter: ["inter", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
