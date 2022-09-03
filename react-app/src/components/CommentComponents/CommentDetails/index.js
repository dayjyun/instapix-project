import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import * as commentActions from '../../../store/comments';
import './CommentDetails.css'

const CommentDetails = () => {
    const { commentId } = useParams();
    const user = useSelector(state => (state.session.user));
    const comment = useSelector(state => (state.comments[commentId]));

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commentActions.getComment(commentId))
    }, [dispatch, commentId])


    const handleDeleteBtn = (commentId) => {
        dispatch(commentActions.removeComment(commentId));
        history.push(`/comments/${commentId}`);
    }

    let commentEditBtns;

    if (comment?.user_id === user?.id) {
        commentEditBtns = (
            <>
                <button onClick={() => history.push(`/comments/${commentId}/edit`)}>Edit</button>
                <button onClick={() => handleDeleteBtn(commentId)}>Delete</button>
            </>
        );
    }

    if (!comment) {
        return (
            <h1>Comment NOT Found</h1>
        )
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        <h1>Details for Comment {commentId}</h1>
                            <div>
                                <h4>USERID: {comment?.user_id}</h4>
                                <h4>POSTID: {comment?.post_id}</h4>
                                <h4>BODY: {comment?.body}</h4>
                            </div>
                        <div className='edit-btns'>
                            {commentEditBtns}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentDetails;
