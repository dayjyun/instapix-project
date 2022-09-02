import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../../store/posts";

function EditPostForm(){
    const dispatch = useDispatch()
    const { postId } = useParams()
    const posts = Object.values(useSelector(state => state.posts))

    useEffect(() => {
        dispatch(editPost(+postId))
    }, [dispatch])

    const handlePostFormSubmit = async (e) => {
        e.preventDefault();

        await dispatch(
            editPost({
                id: postId,
                user_id,
                caption,

            })
        )
    }

    return (
      <div>
        <form onSubmit={handlePostFormSubmit}>
            <ul>

            </ul>
        </form>
      </div>
    );
}

export default EditPostForm
