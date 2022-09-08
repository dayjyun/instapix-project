const GET_LIKE = 'likes/getLike';
const ALL_LIKES = 'likes/getAll'
const POST_LIKES = 'likes/allLikesForPost'
const CREATE_LIKE = 'likes/createLike'
const DELETE_LIKE = 'likes/deleteLike';

const getAll = (likes) => ({
    type: ALL_LIKES,
    payload: likes
})

const allLikesForPost = likes => ({
    type: POST_LIKES,
    payload: likes
})

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

export const fetchLikeForPost = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`)


    const parsedRes = await res.json()
    await dispatch(allLikesForPost(parsedRes))
    // await dispatch(getLike(parsedRes.Likes))
    return res

}

export const fetchLike = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`)


    const parsedRes = await res.json()
    await dispatch(getLike(parsedRes))
    // await dispatch(getLike(parsedRes.Likes))
    return res

}

export const fetchAllLikes = () => async dispatch => {
    const res = await fetch('/api/likes')


    const parsedRes = await res.json()
    await dispatch(getAll(parsedRes))
    return res

}

export const like = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    })


    const parsedRes = await res.json()
    dispatch(createLike(parsedRes))
    return res;

}

export const unlike = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const parsedRes = await res.json()
        dispatch(deleteLike(parsedRes))
        return res
    }
}


const likesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIKE:
            // const setLikeState = { ...state }
            const setLikeState = {}
            action.payload?.likes?.forEach(like => {
                setLikeState[like.id] = like
            });
            return setLikeState
        case POST_LIKES:
            const setPostLikes = { ...state }
            action.payload?.likes?.forEach(like => {
                setPostLikes[like.id] = like
            })
            return setPostLikes
        case DELETE_LIKE:
            const removeLikeState = { ...state }
            delete removeLikeState[action.payload]
            return removeLikeState
        case CREATE_LIKE:
            const newLikeState = { ...state }
            newLikeState[action.payload.id] = action.payload
            return newLikeState
        case ALL_LIKES:
            const allLikesState = {}
            action.payload.likes?.forEach(like => {
                allLikesState[like.id] = like
            })
            return allLikesState
        default:
            return state
    }
}

export default likesReducer
