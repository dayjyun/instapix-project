import * as likeActions from '../../../store/likes'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const LikeComponent = ({ post }) => {
    const dispatch = useDispatch()
    const likes = Object.values(useSelector(state => state.likes))
    const sessionUser = useSelector(state => state.session.user)
    const [liked, setLiked] = useState(null)
    const likesUserIds = post?.real_likes?.map(like => like?.user_id);
    // const like = likes?.filter(like => like?.user_id === sessionUser?.id)
    // console.log('LIKEBUTTON LIKE IDS!!!!!!!!!-------------', likesUserIds, sessionUser?.id, liked)
    // console.log('LIKEBUTTON POST!!!!!!!!!-------------', post)


    useEffect(async () => {
        await currUserLiked()
        dispatch(likeActions.fetchLike(post?.id))
        // dispatch()
    }, [dispatch])

    const currUserLiked = () => {
        setLiked(likesUserIds?.includes(sessionUser?.id))
    }

    const likePost = async () => {
        if (liked) {
            await dispatch(likeActions.unlike(post?.id))
        } else {
            await dispatch(likeActions.like(post?.id))
        }
    };

    let postLiked = (<i className="fa-regular fa-solid fa-heart heart-likes-solid"></i>)
    let postNotLiked = (<i className="fa-regular fa-heart heart-likes-hollow"></i>)

    return (
        <div onClick={async () => likePost()
                .then(async () => setLiked(!liked))}>
            {liked ? postLiked : postNotLiked}
        </div>
    )
}

export default LikeComponent
