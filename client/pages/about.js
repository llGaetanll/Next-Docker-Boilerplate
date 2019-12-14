import Link from 'next/link'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',

		marginRight: theme.spacing(6),
		marginLeft: theme.spacing(6)
	}
}))

const About = ({ text }) => {
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Typography variant="h1">About Page</Typography>
			<Typography variant="h4">{text}</Typography>
			<Link href="/">
				<a>Go to Home Page</a>
			</Link>
		</Box>
	)
}

About.getInitialProps = () => {
	return {
		text: 'text got from the server'
	}
}

export default About
