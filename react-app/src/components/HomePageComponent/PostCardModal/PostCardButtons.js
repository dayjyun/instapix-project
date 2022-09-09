import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteFollowBackend } from '../../../store/follow'

// import * as sessionActions from '../../../store/session'


const PostCardButtons = ({ post, closeModal, randomPost }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleUnfollow = async (e) => {
        e.preventDefault()
        await dispatch(deleteFollowBackend(post?.User?.id))
        closeModal()
    }

    const handleGoToPost = e => {
        e.preventDefault()
        history.push(`/posts/${randomPost?.id}`)
    }

    return (
        <>
            <div className='postcard-button-container'>
                <button onClick={async (e) => await handleUnfollow(e)} style={{ borderBottom: '1px solid lightgray', color: 'red' }}>Unfollow</button>
            </div>
            <div className='postcard-button-container'>
                <button onClick={async () => await setShowModal(true)}
                    style={{ borderBottom: '1px solid lightgray' }}>Go to post</button>
                {showModal && (
                    <PostModal onClose={() => setShowModal(false)}>
                        <GetPost post={post} />
                    </PostModal>
                )}
            </div>
            <div className='postcard-button-container' onClick={closeModal}>
                <button>Cancel</button>
            </div>
        </>
    )
}

export default PostCardButtons
