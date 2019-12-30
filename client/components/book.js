import { makeStyles } from '@material-ui/styles'
import {
	Card,
	CardHeader,
	Avatar,
	CardContent,
	Typography
} from '@material-ui/core'
// import { red } from '@material-ui/core/color'

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	avatar: {
		backgroundColor: '#583248'
	}
}))

const Book = ({ book, author, isbn }) => {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						{author.firstName[0].toUpperCase()}
					</Avatar>
				}
				title={`${author.firstName} ${author.lastName}`}
				subheader={book}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					isbn: {isbn}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default Book
