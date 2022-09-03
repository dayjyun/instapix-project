import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as postActions from '../../../store/posts'
import * as commentActions from '../../../store/comments';
import CreateComment from "../CreateComment";
import './PostComments.css'

const PostsComments = () => {
    const { postId } = useParams()
    const user = useSelector(state => state.session.user)
    const comments = useSelector((state) => Object.values(state.comments))

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(postActions.loadAllPosts())
        dispatch(commentActions.loadPostComments(postId))
    }, [dispatch, postId])


    const getCreatedDate = (datestr) => {
        const now = new Date()
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
                                <img className="comment-profile-pic" src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2011/11/square-format-01.jpg?resize=50%2C50&ssl=1"></img>
                                <div className="comment-username">
                                    {comment?.user?.username}
                                    <div className="comment-date">
                                        {getCreatedDate(comment?.createdAt)}
                                    </div>
                                </div>
                                <div className="comment-body">
                                    {comment?.body}
                                    {comment?.user_id === user?.id &&
                                        <div className="edit-comment-container">
                                            <NavLink className='edit-comment-btn' to={`/comments/${comment?.id}/edit`}>...</NavLink>
                                        </div>
                                        }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <CreateComment />
            </div>
            <div>
            </div>
        </>
    )
}

export default PostsComments
