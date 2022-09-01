import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as postActions from '../../../store/posts'
import * as commentActions from '../../../store/comments';
import CreateComment from "../CreateComment";

const PostsComments = () => {
    const { postId } = useParams()
    const comments = useSelector((state) => Object.values(state.comments))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.loadAllPosts())
        dispatch(commentActions.loadPostComments(postId))
    }, [dispatch, postId])

    let commentTitle;

    if (!comments.length) {
        commentTitle = `No Comments For Post ${postId}`
    }

    return (
        <div>
            <h2>{commentTitle || `Comments For Post ${postId}`}</h2>
            <div>
                {comments?.map((comment) => (
                    <li key={comment?.id}>
                        <div>
                            User ID: {comment.user_id}
                        </div>
                        <div>
                            Comment ID: {comment.id}
                        </div>
                        <div>
                            Body: {comment.body}
                        </div>
                    </li>
                ))}
            </div>
            <div>
                <CreateComment />
            </div>
        </div>
    )
}

export default PostsComments
