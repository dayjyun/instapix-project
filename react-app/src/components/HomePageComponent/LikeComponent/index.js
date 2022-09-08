import * as likeActions from '../../../store/likes'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const LikeComponent = ({ post }) => {
    const dispatch = useDispatch()
    const likes = Object.values(useSelector(state => state.likes))
    const user = useSelector(state => state.session.user)
    const [liked, setLiked] = useState(false)
    const likesUserIds = post?.real_likes?.map(like => like?.user_id);


    useEffect(() => {
        dispatch(likeActions.fetchLike(post?.id))

    }, [dispatch])

    const likePost = async () => {
        if (likesUserIds?.includes(user?.id)) {
            await dispatch(likeActions.unlike(post?.id))

        } else {
            await dispatch(likeActions.like(post?.id))
        }
    };

    let postLiked = (<i className="fa-regular fa-solid fa-heart heart-likes-solid"></i>)
    let postNotLiked = (<i className="fa-regular fa-heart heart-likes-hollow"></i>)

    return (
        <div onClick={async () => await likePost()
            .then(async () => setLiked(!liked))}>
            {liked ? postLiked : postNotLiked}
        </div>
    )
}

export default LikeComponent
