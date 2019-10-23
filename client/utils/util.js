import { CONTAINERS, DOMAIN } from '../constants/index'
import fetch from 'isomorphic-fetch'

export const dockerFetch = async (container, path, properties = {}) => {
	const port = CONTAINERS.get(container)

	// if the container could not be found
	if (typeof port == undefined)
		throw new Error(
			`The container ${container} could not be found. Please specify it in the Map in /constants/index`
		)
	const domain = typeof window != 'undefined' ? DOMAIN : container

	const url = `http://${domain}:${port}${path}`
	console.log(url)
	console.log('DOMAIN', DOMAIN)

	return await fetch(url, properties)
}
