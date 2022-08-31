const ALL_HASHTAGS = 'hashtags/getAllHashtags'
const HASHTAG_FOR_POST = 'hashtags/hashtagForPost'
const CREATE_HASHTAG = 'hashtags/createHashtag'

export const getAllHashtags = hashtags => ({
    type: ALL_HASHTAGS,
    payload: hashtags
})

export const hashtagForPost = hashtag => ({
    type: HASHTAG_FOR_POST,
    payload: hashtag
})

export const createHashtag = hashtag => ({
    type: CREATE_HASHTAG,
    payload: hashtag
})

export const fetchAllHashtags = () => async dispatch => {
    const res = await fetch('/api/hashtags')

    if (res.ok) {
        const parsedRes = await res.json()
        await dispatch(getAllHashtags(parsedRes.Hashtags))
        return res
    }
}

export const fetchSingleHashtag = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/hashtags`)

    if (res.ok) {
        const parsedRes = await res.json()
        await dispatch(hashtagForPost(parsedRes))
        return res;
    }
}

export const newHashtag = (hashtag, postId) => async dispatch => {
    const res = await fetch(`/posts/${postId}/hashtags/new`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            hashtag_value: hashtag
        })
    })

    if (res.ok) {
        const parsedRes = await res.json()
        await dispatch(createHashtag(parsedRes))
        return res;
    }
}


const hashtagReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_HASHTAGS:
            const allHashtagsState = { ...state }
            action.payload.forEach(hashtag => {
                allHashtagsState[hashtag.id] = hashtag
            })
            return allHashtagsState
        case HASHTAG_FOR_POST:
            const hashtagForPostState = { ...state }
            hashtagForPostState[action.payload.id] = action.payload
            return hashtagForPostState
        case CREATE_HASHTAG:
            const newHashtagState = { ...state }
            newHashtagState[action.payload.id] = action.payload
            return newHashtagState
        default:
            return state
    }
}

export default hashtagReducer
