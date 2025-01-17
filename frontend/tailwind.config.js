/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		colors: {
			primary: {
				DEFAULT: '#6a1b9a',
				dark: '#b18bd3',
				mid: '#d2bae9',
				light: '#f7f1fb',
				ligther: '#f9f7fb'
			},
			background: '#ffffff',
			yellowish: {
				DEFAULT: '#f2f2ee',
				light: '#fbfbfa'
			},
			greenish: {
				DEFAULT: '#61988e',
				light: '#d0ebe6'
			},
			grey: {
				DEFAULT: '#333333',
				dark: '#73726f',
				darker: '#989895',
				light: '#d3d3d3',
				lighter: '#e0e0e0'
			},
			black: {
				DEFAULT: '#000000',
				transparent: '#0000000A'
			}
		}
	},
	plugins: []
};
