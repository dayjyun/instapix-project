import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as postActions from '../../../store/posts'
import * as commentActions from '../../../store/comments';

const EditComment = () => {
    const { commentId } = useParams()
    const comment = useSelector((state) => state.comments[commentId]);
    const [body, setBody] = useState('');


    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(commentActions.editComment({
            body
        }, commentId))
            .then(() => {
                history.push(`/posts/${comment.post_id}/comments`)
                // history.push(`/albums/${albumId}`);
            })
            // .catch(async (res) => {
            //     // const data = await res.json();
            //     // if (data && data.errors) {
            //     //     console.log(data.errors);
            //     // }
            // });
    };

    return (
        <>
            <h2 >Edit Your Comment</h2>
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



export default EditComment;
