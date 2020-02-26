// import fetch from 'isomorphic-fetch'
import React, { useContext, useMemo } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { Context } from '../util/context'
import {
	useRunOnLoad,
	useRunBeforeUnload,
	useGetLocalStorage,
	useSetLocalStorage
} from '../util/util'

import Book from '../components/book'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',

		marginRight: theme.spacing(6),
		marginLeft: theme.spacing(6)
	}
}))

const Index = ({ authors, googleUrl, ...props }) => {
	const classes = useStyles()
	const { state, updText, remText } = useContext(Context)
	const { text } = state

	// useRunBeforeUnload(() => {
	// 	useSetLocalStorage('text', text)
	// })

	// updText()

	useRunOnLoad(async () => {
		updText(useGetLocalStorage('text', true))

		const apiResClient = await fetch('/api/test')

		const body = await apiResClient.json()
		console.log('apiResClient body:', body)
	})

	useRunBeforeUnload(() => {
		useSetLocalStorage('text', {
			text: 'This text is loaded from localStorage'
		})
	})

	const handleGetFromServer = async () => {
		let req = await fetch('/api/')
		if (req.status !== 200) return
		req = await req.json()
		console.log(req)
		return req
	}

	return (
		<Box className={classes.root}>
			<Typography variant="h1">Welcome!</Typography>
			<Typography variant="h3">Authors</Typography>
			<Link href={googleUrl}>
				<a>login with google</a>
			</Link>
			<Box display="flex">
				{authors.map(a => (
					<Box display="flex" flexDirection="column">
						{a.books.map(b => (
							<Book
								book={b.title}
								isbn={b.isbn}
								author={{ firstName: a.firstName, lastName: a.lastName }}
							/>
						))}
					</Box>
				))}
			</Box>
			<Button onClick={handleGetFromServer}>Send Request</Button>
		</Box>
	)
}
Index.getInitialProps = async () => {
	// return api data
	// this will be returned as props in the page component
	return {
		authors: [
			{
				firstName: 'Jorge',
				lastName: 'Gonzalez',
				age: 19,
				books: [
					{
						title: 'Book Title 1',
						isbn: '97230498239'
					}
				]
			},
			{
				firstName: 'Robert',
				lastName: 'Cancio',
				age: 19,
				books: [
					{
						title: 'Book Title 2',
						isbn: '972345998436'
					},
					{
						title: 'Book Title 3',
						isbn: '972983249849'
					}
				]
			}
		]
		// googleUrl: s
	}
}

export default Index
