//TYPES
const GET_FOLLOWING = 'users/GET_FOLLOWS'
const GET_FOLLOWERS = 'users/GET_FOLLOWERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/FOLLOW'

//ACTIONS
export const getFollowing = (follows) => {
    return {
        type: GET_FOLLOWING,
        payload: follows
    }
}

export const getFollowers = (follows) => {
    return {
        type: GET_FOLLOWERS,
        payload: follows
    }
}

export const postFollow = (follow) => {
    return {
        type: FOLLOW,
        payload: follow
    }
}
export const deleteFollow = (follow) => {
    return {
        type: UNFOLLOW,
        payload: follow
    }
}
//THUNKS

//GET: all user's following
export const getFollowingBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/follows`);
    const parsedRes = await response.json();
    dispatch(getFollowing(parsedRes))
}

//GET: all user's followers
export const getFollowersBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/followers`)
    const parsedRes = await response.json()
    dispatch(getFollowers(parsedRes))
}

//POST: a follow
export const postFollowBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/users/${userId}/post`)
    const parsedRes = await response.json();
    dispatch(postFollow(parsedRes));
    return parsedRes;
}
//DELETE: a follow (unfollow)
export const deleteFollowBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/delete`);
    const parsedRes = await response.json();
    dispatch(deleteFollow(parsedRes))
}

//INITIAL STATE
const initialState = {}


///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING:
            const getFollowingState = {}
            action.payload.Followers.forEach(follow => {
                getFollowingState[follow.follow.id] = follow
            })

            return getFollowingState;

        case GET_FOLLOWERS:
            const getFollowersState = {}
            action.payload.Followers.forEach(follow => {
                getFollowersState[follow.follow.id] = follow
            })
            return getFollowersState;

        case FOLLOW:
            const followState = { ...state }
            followState[action.payload.id] = action.payload
            return followState

        case UNFOLLOW:
            const unfollowState = { ...state }
            delete unfollowState[action.payload.id]
            return unfollowState;

        default:
            return state;
    }
}

export default followReducer;
