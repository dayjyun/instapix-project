import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postFollowBackend, deleteFollowBackend } from '../../../store/follow'
import { useState, useEffect } from 'react'
// import * as sessionActions from '../../../store/session'


const PostCardButtons = ({ post, closeModal, randomPost }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [follow, setFollow] = useState('Unfollow')
    const currUser = useSelector(state => state.session.user)
    console.log(randomPost)

    const handleUnfollow = e => {
        e.preventDefault()

        dispatch(deleteFollowBackend(post?.User?.id))
        closeModal()
    }

    const handleGoToPost = e => {
        e.preventDefault()
        history.push(`/posts/${randomPost?.id}`)
    }

    return (
        <>
            <div className='postcard-button-container'>
                <button onClick={handleUnfollow} style={{ borderBottom: '1px solid lightgray', color: 'red' }}>{follow}</button>
            </div>
            <div className='postcard-button-container'>
                <button onClick={handleGoToPost} style={{ borderBottom: '1px solid lightgray' }}>Go to post</button>
            </div>
            <div className='postcard-button-container' onClick={closeModal}>
                <button>Cancel</button>
            </div>
        </>
    )
}

export default PostCardButtons
