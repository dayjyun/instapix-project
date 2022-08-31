export const LOAD_POST_COMMENTS = 'comments/loadPostComments';
export const UPDATE_COMMENT = 'comments/updateComment';
export const CREATE_COMMENT = 'comments/createComment';
export const DELETE_COMMENT = 'comments/deleteComment';

const loadAllPostsComment = (data) => {
    return {
        type: LOAD_POST_COMMENTS,
        data
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



export const loadPostComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`);

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadAllPostsComment(comments))
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



let initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_POST_COMMENTS:
        initialState = {...state};
                // console.log('THIS=================>', action)
        action.data.Comments.forEach((comment) => {
            initialState[comment.id] = comment;
        });
        return initialState;
     case UPDATE_COMMENT:
        return {
            ...state,
            [action.data.comment.id]: action.data.comment
        }
    case CREATE_COMMENT:
        return {
            ...state,
            [action.comment.id]: action.comment
        }
    default:
        return state;
    }
}
