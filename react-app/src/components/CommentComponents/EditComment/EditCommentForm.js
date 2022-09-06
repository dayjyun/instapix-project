import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as commentActions from '../../../store/comments';
import './EditComment.css'

const EditCommentForm = ({setShowEditComment, setShowMenuButtons, comment}) => {
    // const { commentId } = useParams()
    // const comment = useSelector((state) => state.comments[commentId]);
    const [body, setBody] = useState('');

    // const history = useHistory();
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
                    <input className='comment-body-input' type='text' name='body' value={body} placeholder={comment?.body} onChange={(e) => setBody(e.target.value)} />
                    <button>Done</button>
                </div>
            </form>
    );
};



export default EditCommentForm;
