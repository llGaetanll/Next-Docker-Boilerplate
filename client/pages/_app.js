import React, { createContext } from 'react'
import ReactDom from 'react-dom'
import Head from 'next/head'
import App from 'next/app'
import { Provider } from '../util/context'
import fetch from 'isomorphic-fetch'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../src/theme'

// export const Context = createContext('black')

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		try {
			// since this fetch always runs on the server we can directly use the name of the container
			const apiResServer = await fetch('http://go-server:3000/api/test/')
			const body = await apiResServer.json()
			console.log('apiResServer body:', body)
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
			userData: {}
		}
	}

	render() {
		const { Component, pageProps, userData } = this.props

		return (
			<>
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
			</>
		)
	}
}
