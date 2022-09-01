import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as commentActions from '../../../store/comments';

const CreateComment = () => {
    const { postId } = useParams()
    const [body, setBody] = useState('');


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(commentActions.createComment({
            body
        }, postId))
    };

    return (
        <>
            <h2 >Create A Comment</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    {/* <ul>
                        {Object.values(errors).map((error, index) => (
                            <li className='error-li' key={index}>{error}</li>
                        ))}
                    </ul> */}
                    <div className='input-container'>
                        <label htmlFor='title'>Body</label>
                        <input type='text' name='body' value={body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <div >
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateComment;
