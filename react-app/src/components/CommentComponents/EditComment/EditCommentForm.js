import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as commentActions from '../../../store/comments';
import './EditComment.css'

const EditCommentForm = ({setShowEditPost, setShowMenuButtons, comment}) => {
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
          setShowEditPost(false);
          setShowMenuButtons(false);
        });
      };

    //   const handleCancelBtn = (e) => {
    //     e.preventDefault();
    //     setShowEditPost(false);
    //     setShowMenuButtons(false);
    //   };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <label htmlFor='title'>Body</label>
                        <input type='text' name='body' value={body} placeholder={comment?.body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <div>
                        <button>Done</button>
                    </div>
                </form>
            </div>
        </>
    );
};



export default EditCommentForm;
