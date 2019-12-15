export const contextActions = dispatch => ({
	updText: event => dispatch({ type: 'UPDATE_TXT', event }),
	remText: () => dispatch({ type: 'REM_TXT' })
})
