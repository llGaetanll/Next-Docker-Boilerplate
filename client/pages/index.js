import 'isomorphic-fetch'
import React from 'react'
import Fork from '../components/Fork'
import Todo from '../components/Todo'

const Index = ({ stars, messages }) => (
	<React.Fragment>
		{/* <Fork stars={stars} />
		<Todo /> */}
		{messages}
		hello
	</React.Fragment>
)

Index.getInitialProps = async () => {
	const res = await fetch(
		'https://api.github.com/repos/ooade/NextSimpleStarter'
	)
	const json = await res.json()

	console.log(
		'env variables:',
		process.env.DOMAIN,
		process.env.CLIENT_EXPOSED_PORT
	)
	return {
		stars: json.stargazers_count,
		messages: [process.env.DOMAIN, process.env.CLIENT_EXPOSED_PORT]
	}
}

export default Index
