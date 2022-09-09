import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from '../../../../store/likes';

const TotalLikesComponent = ({ post }) => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     // dispatch(getPost(post?.id))
    //     dispatch(likeActions.fetchLike(post?.id))
    // }, [dispatch, post?.num_likes])


    let likeStr;

    if (post?.num_likes === 1) likeStr = 'Like'
    else if (post?.num_likes > 1) likeStr = 'Likes'
    else likeStr = 'No Likes Yet'

    return (
        <span className="feed-total-likes">{post?.num_likes > 0 ? post?.num_likes : ''} {likeStr}</span>
    )
}

export default TotalLikesComponent
