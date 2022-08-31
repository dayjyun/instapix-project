const GET_LIKE = 'likes/getLike';
const CREATE_LIKE = 'likes/createLike'
const DELETE_LIKE = 'likes/deleteLike';

export const getLike = like => ({
    type: GET_LIKE,
    payload: like
})

export const deleteLike = (likeId) => ({
    type: DELETE_LIKE,
    payload: likeId
})

export const createLike = (like) => ({
    type: CREATE_LIKE,
    payload: like
})

export const fetchLike = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`)

    if (res.ok) {
        const parsedRes = await res.json()
        await dispatch(getLike(parsedRes))
        return res
    }
}

export const like = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        const parsedRes = await res.json()
        dispatch(createLike(parsedRes))
        return res;
    }
}

export const unlike = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        await res.json()
        dispatch(deleteLike(fetchLike(postId).id))
        return res
    }
}


const initialState = { likes: null }

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKE:
            const setLikeState = { ...state }
            setLikeState[action.payload.id] = action.payload
            return setLikeState
        case DELETE_LIKE:
            const removeLikeState = { ...state }
            delete removeLikeState[action.payload]
            return removeLikeState
        case CREATE_LIKE:
            const newLikeState = { ...state }
            newLikeState[action.payload.id] = action.payload
            return newLikeState
        default:
            return state
    }
}

export default likesReducer
