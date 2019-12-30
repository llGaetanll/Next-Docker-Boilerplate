import React, { createContext } from 'react'
import ReactDom from 'react-dom'
import Head from 'next/head'
import App, { Container } from 'next/app'
import { Provider } from '../util/context'
import fetch from 'isomorphic-fetch'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// export const Context = createContext('black')

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let userData = { text: null }
		try {
			userData = await fetch('http://go-server:3001/api/') // since this fetch always runs on the server we can directly use the name of the container
			console.log(userData)
			// if (userData) userData = await userData.json()
			// console.log(userData)
		} catch (e) {
			console.error(e)
		}

		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {})
			},
			userData
		}
	}

	render() {
		const { Component, pageProps, userData } = this.props

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
						<Provider data={userData}>
							<Component {...pageProps} />
						</Provider>
					</CssBaseline>
				</ThemeProvider>
			</Container>
		)
	}
}
