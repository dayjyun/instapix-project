import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getFollowingPosts } from "../../../store/posts"
import { FeedPostModalCommentBtn } from "../FeedPostModal"
import PostCardModal from "../PostCardModal"
import LikeComponent from "../LikeComponent"
import TotalLikesComponent from "../LikeComponent/TotalLikesComponent"
import { FeedPostModalViewStr } from "../FeedPostModal"
import { getCreatedDate } from "../../CommentComponents/PostsComments"
import { Link } from "react-router-dom"




const FeedPostsComponent = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const posts = Object.values(useSelector(state => state.posts))
    const likes = useSelector(state => state.likes)
    const comments = useSelector(state => state.comments)


    useEffect(() => {
        dispatch(getFollowingPosts())
    }, [dispatch, likes, comments])

    const ProfileImageTagSmallCard = (post) => {
        if (post?.User?.profile_image) {
            return (
                <div className="" onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${post?.User?.id}`)
                }}>
                    <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={post?.User?.profile_image} alt='preview'></img>
                </div>
            )
        } else {
            return (
                <div style={{ marginTop: '-.1em' }} onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${post?.User?.id}`)
                }} className='fa-regular fa-user-circle fa-xl'></div>
            )
        }
    }

    return (
        <div className="feed-section">
            {posts && (Object.values(posts)?.map(post => {
                return (
                    <div key={post?.id} className="feed-post-container">
                        <div className="feed-username-container">
                            {ProfileImageTagSmallCard(post)}
                            {/* <Link to={`/users/${post?.User?.id}`}>{post?.User?.username}</Link> */}
                            <a className="username-styling-4" href={`/users/${post?.User?.id}`}>{post?.User?.username}</a>
                            <div>
                                <PostCardModal
                                    post={post} randomPost={post} />
                            </div>
                        </div>
                        <div className="feed-post-image">
                            <img className="feed-image" src={post?.post_url} alt="previewImage"></img>
                        </div>
                        <div className="feed-like-container">
                            <LikeComponent post={post} /> <FeedPostModalCommentBtn post={post} user={post?.User} />
                        </div>
                        <TotalLikesComponent post={post} onClick={(e) => {
                            e.preventDefault()
                            history.push(`/users/${post?.user_id}`)
                        }} />
                        <span className='feed-caption'
                            onClick={(e) => {
                                e.preventDefault()
                                history.push(`/users/${post?.user_id}`)
                            }}>{post?.User?.username}
                            <span style={{ fontWeight: '400' }}> {post?.caption}</span>
                        </span>
                        <div className="load-comments-button"><FeedPostModalViewStr user={post?.User} post={post} /></div>
                        <div className="feed-post-date">{getCreatedDate(post?.created_at)}</div>
                    </div>
                )
            }))}
        </div>
    )
}

export default FeedPostsComponent
