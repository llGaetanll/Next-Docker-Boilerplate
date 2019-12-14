// REDUX ACTION TYPES
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// list of containers
// [name, port]

export const CONTAINERS = new Map([
	['container1', process.env.CONTAINER1_EXPOSED_PORT],
	['container2', process.env.CONTAINER2_EXPOSED_PORT]
])

export const DOMAIN = process.env.DOMAIN

console.log('environment variable DOMAIN:', DOMAIN)
