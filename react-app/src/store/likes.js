const GET_LIKE = 'likes/getLike';
const CREATE_LIKE = 'likes/createLike'
const DELETE_LIKE = 'likes/deleteLike';

export const getLike = like => ({
    type: GET_LIKE,
    payload: like
})

export const deleteLike = (res) => ({
    type: DELETE_LIKE,
    payload: res
})

export const createLike = (like) => ({
    type: CREATE_LIKE,
    payload: like
})

export const fetchLike = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`)

    if (res.ok) {
        const parsedRes = await res.json()
        await dispatch(getLike(parsedRes.Likes))
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
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const parsedRes = await res.json()
        console.log(parsedRes)
        dispatch(deleteLike(parsedRes))
        return res
    }
}


const likesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIKE:
            const setLikeState = { ...state }
            action.payload?.forEach(like => {
                setLikeState[like.id] = like
            });
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
