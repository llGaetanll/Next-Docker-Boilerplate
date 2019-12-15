import 'isomorphic-fetch'
import React, { useContext, useMemo } from 'react'
import Link from 'next/link'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { Context } from '../util/context'
import {
	useRunOnLoad,
	useRunBeforeUnload,
	useGetLocalStorage,
	useSetLocalStorage
} from '../util/util'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',

		marginRight: theme.spacing(6),
		marginLeft: theme.spacing(6)
	}
}))

const Index = props => {
	const classes = useStyles()
	const { state, updText, remText } = useContext(Context)
	const { text } = state

	// useRunBeforeUnload(() => {
	// 	useSetLocalStorage('text', text)
	// })

	// updText()

	useRunOnLoad(() => {
		updText(useGetLocalStorage('text', true))
	})

	useRunBeforeUnload(() => {
		useSetLocalStorage('text', {
			text: 'This text is loaded from localStorage'
		})
	})

	return (
		<Box className={classes.root}>
			<Typography variant="h1">Welcome!</Typography>
			<Typography>
				Edit <code>/pages/index.js</code> to get started
			</Typography>
			<Typography>{text}</Typography>
			<Button onClick={() => updText({ text: `${text}!` })}>Add to Text</Button>
			<Button onClick={() => remText()}>Remove Text</Button>
			<Link href="/about">
				<a>Go to About Page</a>
			</Link>
		</Box>
	)
}
Index.getInitialProps = async () => {
	// do some api calls...

	// return api data
	// this will be returned as props in the page component
	return {}
}

export default Index
