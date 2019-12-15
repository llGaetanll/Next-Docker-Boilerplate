import React, { createContext } from 'react'
import ReactDom from 'react-dom'
import Head from 'next/head'
import App, { Container } from 'next/app'
import { Provider } from '../util/context'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// export const Context = createContext('black')

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {})
			}
		}
	}

	// handleSave() {
	// 	// console.log('saving data now...', window.localStorage)
	// 	// // only run this client side
	// 	// if (window != undefined)
	// 	// 	localStorage.setItem()
	// }

	// componentDidMount() {
	// 	// for development, run axe to check warnings
	// 	if (process.env.NODE_ENV !== 'production') {
	// 		const axe = require('react-axe')
	// 		axe(React, ReactDom, 1000)
	// 	}

	// 	window.addEventListener('beforeunload', this.handleSave)
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener('beforeunload', this.handleSave)
	// }

	render() {
		const { Component, pageProps } = this.props

		const theme = createMuiTheme({
			palette: {
				background: {
					default: '#EEE'
				},
				primary: {
					main: '#673ab7'
				}
			}
		})

		return (
			<Container>
				<Head>
					<title>Title of your App</title>
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<Provider data={{ text: 'This text is loaded from the server' }}>
							<Component {...pageProps} />
						</Provider>
					</CssBaseline>
				</ThemeProvider>
			</Container>
		)
	}
}
