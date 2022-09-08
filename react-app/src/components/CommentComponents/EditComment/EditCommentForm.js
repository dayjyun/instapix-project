import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as commentActions from '../../../store/comments';
import './EditComment.css'

const EditCommentForm = ({setShowEditComment, setShowMenuButtons, comment}) => {
    const [body, setBody] = useState(comment?.body);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(commentActions.editComment({
            body
        }, comment?.id))
        .then(() => {
          setShowEditComment(false);
          setShowMenuButtons(false);
        });
      };

    return (
            <form onSubmit={handleSubmit} className='edit-comment-form'>
                <div className='input-container'>
                    <input className='comment-body-input' type='text' name='body' value={body} onChange={(e) => setBody(e.target.value)} />
                    <button>Done</button>
                </div>
            </form>
    );
};



export default EditCommentForm;
