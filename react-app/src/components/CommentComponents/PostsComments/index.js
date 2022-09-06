import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as likeActions from '../../../store/likes';
import * as commentActions from '../../../store/comments';
import CreateComment from "../CreateComment";
import EditCommentModal from "../EditComment";
import EditComment from "../EditComment";
import './PostComments.css'

const PostsComments = ({ post }) => {
    // const { postId } = useParams()
    const user = useSelector(state => state.session.user)
    const comments = useSelector((state) => Object.values(state.comments))
    const likes = useSelector(state => Object.values(state.likes))
    const [editing, setEditing] = useState(false);
    const [liked, setLiked] = useState(false);

    console.log('LIKES',likes)
    console.log('POST',post);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(async () => {
        await currUserLiked()
        dispatch(commentActions.loadPostComments(post?.id))
        dispatch(likeActions.fetchLike(post?.id))
    }, [dispatch, post])


    const getCreatedDate = (datestr) => {
        const fullDate = new Date(datestr).toDateString()
        const date = fullDate.slice(4)
        return date
    }

    const userProfile = (userId) => {
        history.push(`/users/${userId}`)
        history.go(0)
    }

    const currUserLiked = () => {
        const userIds = likes.map(like => like.user_id);
        setLiked(userIds.includes(user?.id))
    }

    let postLiked = (<i className="fa-regular fa-solid fa-heart heart-likes-solid"></i>)

    let postNotLiked = (<i className="fa-regular fa-heart heart-likes-hollow"></i>)


    return (
        <>
            <div className="post-comments-container">
                <ul className="comment-card-list">
                    {comments?.map((comment) => (
                        <li className='comment-card-container' key={comment?.id}>
                            {/* <div className="comment-profile-pic"> */}
                            {/* {comment?.user?.profile_image} */}
                            {/* </div> */}
                            <div className="comment-content">
                                <img className="comment-profile-pic" onClick={() => userProfile(comment?.user?.id)} src={comment?.user?.profile_image} alt='preview'></img>
                                <div className="comment-username" onClick={() => userProfile(comment?.user?.id)}>
                                    {comment?.user?.username}
                                    <div className="comment-date">
                                        {getCreatedDate(comment?.createdAt)}
                                    </div>
                                </div>
                                <div className="comment-body">
                                    {editing ? <EditComment /> : comment?.body}
                                    {comment?.user_id === user?.id &&
                                        <div className="edit-comment-container">
                                            {/* <NavLink className='edit-comment-btn' to={`/comments/${comment?.id}/edit`}>...</NavLink> */}
                                            {/* <button className="edit-comment-btn" onClick={() => setEditing(!editing)}>...</button> */}
                                            <EditCommentModal comment={comment}/>
                                            {/* onClick={setEditing(!editing)} */}
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
                            <div>{liked ? postLiked : postNotLiked}</div>
                            <div><i className="fa-regular fa-comment comment-bubble"></i></div>
                        </div>
                        <div className="post-likes">{post?.likes} likes</div>
                        <div className="post-date">{getCreatedDate(post?.created_at)}</div>
                    </div>
                    <CreateComment post={post} />
                </div>
            </div>
        </>
    )
}

export default PostsComments
