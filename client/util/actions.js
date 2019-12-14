export const contextActions = dispatch => ({
	updText: event => dispatch({ type: 'UPDATE_TXT', event }),
	remText: event => dispatch({ type: 'REM_TXT', event })
})
