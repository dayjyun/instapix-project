const TotalLikesComponent = ({ post }) => {
    return (
        <span className="feed-total-likes">{post?.num_likes} {post?.num_likes > 1 ? 'Likes' : 'Like'}</span>
    )
}

export default TotalLikesComponent
