import { Button } from '@material-ui/core'
import { dockerFetch } from '../utils/util'

const FetchButton = () => {
	const handleClick = () => dockerFetch('container1', '/api/test')
	return <Button onClick={handleClick}>Click This</Button>
}

export default FetchButton
