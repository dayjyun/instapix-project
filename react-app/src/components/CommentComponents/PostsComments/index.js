import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as postActions from '../../../store/posts'
import * as commentActions from '../../../store/comments';
import CreateComment from "../CreateComment";
import './PostComments.css'

const PostsComments = () => {
    const { postId } = useParams()
    const comments = useSelector((state) => Object.values(state.comments))

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(postActions.loadAllPosts())
        dispatch(commentActions.loadPostComments(postId))
    }, [dispatch, postId])


    const getDate = (datestr) => {
        const fullDate = new Date(datestr).toDateString()
        const date = fullDate.slice(4)
        return date
    }


    let commentTitle;

    if (!comments.length) {
        commentTitle = `No Comments For Post ${postId}`
    }

    return (
        <>
            <div className="post-comments-container">
                <ul className="comment-card-list">
                    {comments?.map((comment) => (
                        <li className='comment-card-container' key={comment?.id}>
                            {/* <div className="comment-profile-pic"> */}
                                {/* {comment?.user?.profile_image} */}
                                <img className="comment-profile-pic" src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2011/11/square-format-01.jpg?resize=50%2C50&ssl=1"></img>
                            {/* </div> */}
                            <div>
                                <div className="comment-username">
                                    {comment?.user?.username}
                                </div>
                                <div className="comment-date">
                                    {getDate(comment?.createdAt)}
                                </div>
                            </div>
                            <div className="comment-body">
                                {comment?.body}
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
