import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteFollow } from '../../../store/follow'

const PostCardButtons = ({ follower }) => {
    const history = useHistory()
    const dispatch = useDispatch()


    const handleUnfollow = e => {
        e.preventDefault()
        dispatch(deleteFollow(follower?.follower_info?.id))
    }

    return (
        <>
            <div className='postcard-button-container'>
                <button onClick={handleUnfollow} style={{ borderBottom: '1px solid lightgray', color: 'red' }}>Unfollow</button>
            </div>
            <div className='postcard-button-container'>
                <button style={{ borderBottom: '1px solid lightgray' }}>Go to post</button>
            </div>
            <div className='postcard-button-container'>
                <button>Cancel</button>
            </div>
        </>
    )
}

export default PostCardButtons
