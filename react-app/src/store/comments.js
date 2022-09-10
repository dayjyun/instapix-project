export const LOAD_POST_COMMENTS = 'comments/loadPostComments';
export const LOAD_ONE_COMMENT = 'comments/loadOneComment';
export const UPDATE_COMMENT = 'comments/updateComment';
export const CREATE_COMMENT = 'comments/createComment';
export const DELETE_COMMENT = 'comments/deleteComment';

const loadAllPostsComment = (data) => {
    return {
        type: LOAD_POST_COMMENTS,
        data
    }
}

const loadComment = (comment) => {
    return {
        type: LOAD_ONE_COMMENT,
        comment
    }
}

const updateComment = (data) => {
    return {
        type: UPDATE_COMMENT,
        data
    }
}

const addComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}



export const loadPostComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`);

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadAllPostsComment(comments))
    }
}

export const getComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`);

    if (res.ok) {
        const comment = await res.json();
        dispatch(loadComment(comment))
    }
}

export const editComment = (comment, commentId) => async (dispatch) => {
    const { body } = comment;

    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body
        })
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(updateComment(data))
        return res
    }
};

export const createComment = (comment, postId) => async (dispatch) => {
    const { body } = comment;

    const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addComment(data))
        return res
    }
}

export const removeComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteComment(id))
    }
};



let newState = {}

export default function reducer(state = newState, action) {
    switch (action.type) {
        case LOAD_POST_COMMENTS:
            newState = {};
            action.data.Comments.forEach((comment) => {
                newState[comment.id] = comment;
            });
            return newState;
        case LOAD_ONE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case UPDATE_COMMENT:
            // console.log(action.data);
            return {
                ...state,
                [action.data.id]: action.data
            }
        case CREATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case DELETE_COMMENT:
            newState = { ...state };
            delete newState[action.id];
            return newState
        default:
            return state;
    }
}
