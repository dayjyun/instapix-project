import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as postActions from '../../../store/posts'
import * as commentActions from '../../../store/comments';

const PostsComments = () => {
    const {postId} = useParams()
    const post = useSelector((state) => (state.posts[postId]));
    const comments = useSelector((state) => Object.values(state.comments))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.loadAllPosts())
    }, [dispatch])

    useEffect(() => {
        dispatch(commentActions.loadPostComments(postId))
    }, [dispatch])

    return (
        <div>
            <h2>ALL POSTS</h2>
            <div>
                {comments?.map((comment) => (
                    <li key={comment?.id}>comment ID - {comment.id} BODY - {comment.body}</li>
                ))}
            </div>
        </div>
    )
}



export default PostsComments
