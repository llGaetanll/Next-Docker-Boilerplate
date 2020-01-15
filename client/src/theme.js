import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, purple } from '@material-ui/core/colors'

const light = {
	background: {
		default: '#fbfbfb'
	}
}

const dark = {
	background: {
		default: '#0c0b0c'
	}
}

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		common: {
			black: '#000',
			white: '#fff'
		},
		type: 'light',
		primary: {
			light: purple[50],
			main: purple[700],
			dark: purple[800],
			contrastText: '#1a1027'
		},
		secondary: {
			light: blueGrey[50],
			main: blueGrey[100],
			dark: blueGrey[800],
			contrastText: '#fff'
		},
		background: light.background
	},
	shadows: [
		'none',
		'0 0 36px rgba(0, 0, 0, 0.1)',
		'0 0 36px rgba(0, 0, 0, 0.2)',
		'0 0 42px rgba(0, 0, 0, 0.3)',
		'0 0 46px rgba(0, 0, 0, 0.4)',
		'0 0 52px rgba(0, 0, 0, 0.5)'
	],
	typography: {
		fontFamily: [
			'-apple-system',
			'Roboto',
			'Roboto Medium',
			'"Product Sans", sans-serif',
			'"Rubik", sans-serif'
		],
		h1: {},
		h2: {},
		h3: {
			fontFamily: '"Product Sans", "Helvetica", "Arial", sans-serif'
		},
		h4: {
			fontFamily: '"Rubik", sans-serif',
			fontWeight: 500
		},
		h5: {},
		h6: {}
	},
	shape: {
		borderRadius: 10
	}
})

export default theme
