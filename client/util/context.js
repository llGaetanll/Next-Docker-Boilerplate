import React, { createContext } from 'react'

import { contextActions } from './actions'
import useStateReducer from './reducer'

export const Context = createContext({ text: 'default text' })

// data is anything passed from the server that will get loaded server-side
export const Provider = ({ children, data }) => {
	const { state, dispatch } = useStateReducer(data) // here, as default state, we pass in the ssr text, but you could do whatever you want

	return (
		<Context.Provider value={{ state, ...contextActions(dispatch) }}>
			{children}
		</Context.Provider>
	)
}
