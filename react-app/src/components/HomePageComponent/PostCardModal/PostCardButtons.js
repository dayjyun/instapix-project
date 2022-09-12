import { useDispatch } from 'react-redux'
import { deleteFollowBackend } from '../../../store/follow'
import { useState } from 'react'
import { PostModal } from '../../../context/Modal'
import GetPost from '../../GetPostModal/GetPost'


const PostCardButtons = ({ post, closeModal }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);

    const handleUnfollow = async (e) => {
        e.preventDefault()
        await dispatch(deleteFollowBackend(post?.User?.id))
        closeModal()
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
