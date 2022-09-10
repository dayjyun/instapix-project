import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as likeActions from '../../../store/likes';
import * as commentActions from '../../../store/comments';
import CreateComment from "../CreateComment";
import EditCommentModal from "../EditComment";
import './PostComments.css'
import LikesModal from "../../LikesModal";
// import { getUserPostsBackend } from "../../../store/posts";

export const getCreatedDate = (datestr) => {
    const fullDate = new Date(datestr).toDateString()
    let date = fullDate.slice(4)
    if (date[4] === '0') {
        date = date.slice(0, 4) + date.slice(5);
    };
    return date
}

const PostsComments = ({ post }) => {
    const user = useSelector(state => state.session.user)
    const comments = useSelector((state) => Object.values(state.comments));
    const likes = useSelector(state => Object.values(state.likes))
    const likesUserIds = likes?.map(like => like?.user_id);
    const [liked, setLiked] = useState(false);
    const inputEl = useRef(null);
    const [currPost, setCurrPost] = useState(post)

    const history = useHistory();
    const dispatch = useDispatch();



    // useEffect(() => {
    //     if (user) {
    //         dispatch(getUserPostsBackend(user.id))
    //     }
    // }, [dispatch, user])


    useEffect(() => {
        const currUserLiked = () => {
            setLiked(likesUserIds?.includes(user.id))
        }
        currUserLiked()
    }, [likesUserIds, user.id])

    useEffect(() => {
        dispatch(commentActions.loadPostComments(post.id))
        dispatch(likeActions.fetchLike(post.id))
    }, [dispatch, post.id])

    const likePost = async () => {
        if (likesUserIds?.includes(user?.id)) {
            await dispatch(likeActions.unlike(post?.id))

        } else {
            await dispatch(likeActions.like(post?.id))
        }
    };

    let postLiked = (<i className="fa-regular fa-solid fa-heart heart-likes-solid"></i>)
    let postNotLiked = (<i className="fa-regular fa-heart heart-likes-hollow"></i>)

    comments?.sort((a, b) => {
        return b.id - a.id;
    })

    return (
        <>
            <div className="post-comments-container">
                <ul className="comment-card-list">
                    {comments?.map((comment, i) => (
                        <li className='comment-card-container' key={i}>
                            {/* <div className="comment-profile-pic"> */}
                            {/* {comment?.user?.profile_image} */}
                            {/* </div> */}
                            <div className="comment-content">
                                <img className="comment-profile-pic" onClick={(e) => {
                                    e.preventDefault()
                                    history.push(`/users/${comment?.user?.id}`)
                                }} src={comment?.user?.profile_image} alt='preview'></img>
                                <div className="comment-username" onClick={(e) => {
                                    e.preventDefault()
                                    history.push(`/users/${comment?.user?.id}`)
                                }}>
                                    {comment?.user?.username}
                                    <div className="comment-date">
                                        {getCreatedDate(comment?.createdAt)}
                                    </div>
                                </div>
                                <div className="comment-body">
                                    {comment?.body}
                                    {comment?.user_id === user?.id &&
                                        <div className="edit-comment-container">
                                            <EditCommentModal post={currPost} comment={comment} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <div className="likes-comment-container">
                        <div className="heart-comment-bubble">
                            <div onClick={async () => await likePost()
                                .then(async () => setLiked(!liked))
                                .then(async () => await setCurrPost(post))}>
                                {liked ? postLiked : postNotLiked}
                            </div>
                            <div
                                onClick={() => inputEl.current.focus()}>
                                <i className="fa-regular fa-comment comment-bubble"></i>
                            </div>
                        </div>
                        <div className="post-likes">
                            {/* {likes?.length} likes */}
                            <LikesModal likes={likes} />
                        </div>
                        <div className="post-date">{getCreatedDate(post?.created_at)}</div>
                    </div>
                    <CreateComment inputEl={inputEl} post={post} />
                </div>
            </div>
        </>
    )
}

export default PostsComments
