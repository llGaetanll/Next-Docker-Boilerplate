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

	const addAuthor = () => {}

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

	return (
		<Box className={classes.root}>
			<Typography variant="h3">Authors</Typography>
			<Link href={googleUrl} prefetch={false}>
				<a>login with google</a>
			</Link>
			<Button onClick={addAuthor}>Add Author</Button>
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
		</Box>
	)
}
Index.getInitialProps = async () => {
	// get google url
	const googleURLRes = await fetch('http://go-server:3000/auth/url/google')
	const { url } = await googleURLRes.json()

	// get authors and books
	const bookRes = await fetch('http://go-server:3000/', {
		method: 'POST',
		body: `{"query": "{ authors { firstName lastName books { isbn title } } }"}`
	})

	const res = await bookRes.json()

	console.log('res:', JSON.stringify(res))
	// return api data
	// this will be returned as props in the page component
	return {
		// authors: [
		// 	{
		// 		firstName: 'Jorge',
		// 		lastName: 'Gonzalez',
		// 		age: 19,
		// 		books: [
		// 			{
		// 				title: 'Book Title 1',
		// 				isbn: '97230498239'
		// 			}
		// 		]
		// 	},
		// 	{
		// 		firstName: 'Robert',
		// 		lastName: 'Cancio',
		// 		age: 19,
		// 		books: [
		// 			{
		// 				title: 'Book Title 2',
		// 				isbn: '972345998436'
		// 			},
		// 			{
		// 				title: 'Book Title 3',
		// 				isbn: '972983249849'
		// 			}
		// 		]
		// 	}
		// ],
		authors: res.data.authors,
		googleUrl: url
	}
}

export default Index
