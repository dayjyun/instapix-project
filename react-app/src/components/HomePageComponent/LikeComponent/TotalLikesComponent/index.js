const TotalLikesComponent = ({ post }) => {
    let likeStr;


    if (post?.num_likes === 1) likeStr = 'Like'
    else if (post?.num_likes > 1) likeStr = 'Likes'
    else likeStr = 'No Likes Yet'

    return (
        <span className="feed-total-likes">{post?.num_likes > 0 ? post?.num_likes : ''} {likeStr}</span>
    )
}

export default TotalLikesComponent
