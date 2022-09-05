import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import * as postActions from '../../../store/posts'
import * as commentActions from '../../../store/comments';
import CreateComment from "../CreateComment";
import EditCommentModal from "../EditComment";
import EditComment from "../EditComment";
import './PostComments.css'

const PostsComments = ({ post }) => {
    // const { postId } = useParams()
    const user = useSelector(state => state.session.user)
    const comments = useSelector((state) => Object.values(state.comments))
    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(postActions.loadAllPosts())
        dispatch(commentActions.loadPostComments(post?.id))
    }, [dispatch])


    const getCreatedDate = (datestr) => {
        // const now = new Date()
        const fullDate = new Date(datestr).toDateString()
        const date = fullDate.slice(4)
        return date
    }



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
                                <img className="comment-profile-pic" src={comment?.user?.profile_image} alt='preview'></img>
                                <div className="comment-username">
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
                    <CreateComment post={post} />
                </div>
            </div>
        </>
    )
}

export default PostsComments
