import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as commentActions from '../../../store/comments';

import './CreateComment.css'

const CreateComment = ({inputEl, post}) => {
    const [body, setBody] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(commentActions.createComment({
            body
        }, post?.id))
        .then(setBody(''))
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    {/* <ul>
                        {Object.values(errors).map((error, index) => (
                            <li className='error-li' key={index}>{error}</li>
                        ))}
                    </ul> */}
                    <div className='comment-input-container'>
                        <div>
                        <input ref={inputEl} className='comment-body-input' type='text' name='body' value={body} placeholder='Add a comment...' onChange={(e) => setBody(e.target.value)} />
                        </div>
                        <div>
                        <button className="comment-submit-btn">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateComment;
