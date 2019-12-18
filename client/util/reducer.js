import { useReducer } from 'react'

// a general purpose example reducer
const useStateReducer = defState => {
	const [state, dispatch] = useReducer((state, action) => {
		const { type, event } = action

		switch (type) {
			case 'UPDATE_TXT': // as you scale you would want to define those as constants but for now this is ok
				if (!event) return state
				const { text } = event
				return { ...state, text }
			case 'REM_TXT':
				return { ...state, text: null }
			default:
				return state
		}
	}, defState)

	return { state, dispatch }
}

export default useStateReducer
