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
 * Saves data to localStorage right before the page unloads
 * @param {string} name The name of the key to save to localStorage
 * @param {any} object The object to save to localStorage
 */
export const useSetLocalStorage = (name, object) => {
	useEffect(() => {
		const save = () => {
			console.log('aight im boutta head out')
			// only run this on the client
			if (window === undefined) return
			localStorage.setItem(name, JSON.stringify(object))
		}

		window.addEventListener('beforeunload', save)
		return () => {
			window.removeEventListener('beforeunload', save)
		}
	})
}

/**
 *
 * @param {string} name The name of the key to get from localStorage
 * @param {*} callback The callback when we get the object. This function is never called if the object does not exist
 */
export const useGetLocalStorage = (name, callback) => {
	useEffect(() => {
		const get = () => {
			console.log('getting shit')
			// only run on the client
			if (window === undefined) return

			let jsonStr = localStorage.getItem(name)
			if (!jsonStr) return

			callback(JSON.parse(jsonStr))
		}

		window.addEventListener('load', get)
		return () => window.removeEventListener('load', get)
	})
}
