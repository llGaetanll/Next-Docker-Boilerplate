import { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'

import { CONTAINERS, DOMAIN } from '../src/constants'

// TODO: look into routers to remove dockerFetch

/**
 * Automatically talks to containers from the client
 * @param {*} container
 * @param {*} path
 * @param {*} properties
 */
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

/**
 * Runs a function on page load
 * @param {*} callback Callback function to be run when page first loads
 */
export const useRunOnLoad = callback => {
	useEffect(() => {
		window.addEventListener('load', callback)
		return () => {
			window.removeEventListener('load', callback)
		}
	})
}

/**
 * Runs a function before page unloads
 * @param {*} callback Callback function to be run before the page unloads
 */
export const useRunBeforeUnload = callback => {
	useEffect(() => {
		window.addEventListener('beforeunload', callback)
		return () => {
			window.removeEventListener('beforeunload', callback)
		}
	})
}

/**
 * Saves objects to localStorage
 * @param {string} name The name of the key to save to localStorage
 * @param {any} object The object to save to localStorage
 */
export const useSetLocalStorage = (name, object) => {
	// only run this on the client
	if (window !== undefined) localStorage.setItem(name, JSON.stringify(object))
}

/**
 * Gets object in localStorage
 * @param {string} name The name of the key to get from localStorage
 * @param {bool=} parse Whether to JSON.parse object
 */
export const useGetLocalStorage = (name, parse) => {
	if (typeof window === 'undefined') return

	let str = localStorage.getItem(name)
	if (!str || !parse) return str

	return JSON.parse(str)
}
