import PostComponent from "../components/PostsComponent"

//TYPES
const GET_LOGGED_USER_FOLLOWING = 'user/GET_LOGGED_USER_FOLLOWING'
const GET_FOLLOWING = 'users/GET_FOLLOWS'
const GET_FOLLOWERS = 'users/GET_FOLLOWERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/FOLLOW'

//ACTIONS
export const getLoggedUserFollowing = (follows) => {
    return {
        type: GET_LOGGED_USER_FOLLOWING,
        payload: follows
    }
}

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
//GET: logged user's following
export const getLoggedUserFollowingBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/follows`);
    const parsedRes = await response.json();
    dispatch(getLoggedUserFollowing(parsedRes))

}

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
export const postFollowBackend = (input) => async (dispatch) => {
    // console.log(input.)
    const response = await fetch(`/api/follows/users/${input.user_id}/post`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            user_id: input.user_id,
            follows_id: input.follows_id
        }
    })
    const parsedRes = await response.json();
    dispatch(postFollow(parsedRes));
    return parsedRes;
}
//DELETE: a follow (unfollow)
export const deleteFollowBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/delete`, {
        method: 'DELETE'
    });
    const parsedRes = await response.json();
    console.log(parsedRes)
    dispatch(deleteFollow(parsedRes))
}

//INITIAL STATE
const initialState = { loggedUser: null }


///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGGED_USER_FOLLOWING:
            const getLoggedUserFollowingState = { ...state }
            getLoggedUserFollowingState.loggedUser = action.payload
            return getLoggedUserFollowingState;

        case GET_FOLLOWING:
            const getFollowingState = { ...state }
            action.payload.Followers.forEach(follow => {
                getFollowingState[follow.follow.id] = follow
            })
            return getFollowingState;

        case GET_FOLLOWERS:
            const getFollowersState = { ...state }
            action.payload.Followers.forEach(follow => {
                getFollowersState[follow.follow.id] = follow
            })
            return getFollowersState;

        case FOLLOW:
            const followState = { ...state }
            followState[action.payload.id] = action.payload
            // console.log(followState)
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
