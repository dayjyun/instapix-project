import PostComponent from "../components/PostsComponent"

//TYPES
const GET_LOGGED_USER_FOLLOWING = 'user/GET_LOGGED_USER_FOLLOWING'
const GET_FOLLOWING = 'users/GET_FOLLOWS'
const GET_FOLLOWERS = 'users/GET_FOLLOWERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'

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
    if (response.ok) {
        const parsedRes = await response.json();
        dispatch(getLoggedUserFollowing(parsedRes))
    }

}

//GET: all user's following
export const getFollowingBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/follows`);
    if (response.ok) {
        const parsedRes = await response.json();
        dispatch(getFollowing(parsedRes))
    }
}

//GET: all user's followers
export const getFollowersBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/followers`)
    if (response.ok) {
        const parsedRes = await response.json()
        dispatch(getFollowers(parsedRes))
    }
}

//POST: a follow
export const postFollowBackend = (input) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${input.follows_id}/post`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            user_id: input.user_id,
            follows_id: input.follows_id
        }
    })
    if (response.ok) {
        const parsedRes = await response.json();
        dispatch(postFollow(parsedRes));
        return parsedRes;
    }
}
//DELETE: a follow (unfollow)
export const deleteFollowBackend = (userId) => async (dispatch) => {
    console.log("THISSSSSSSSSS", userId)
    const response = await fetch(`/api/follows/users/${userId}/delete`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const parsedRes = await response.json();
        console.log(parsedRes)
        dispatch(deleteFollow(parsedRes))
    }
}

//INITIAL STATE
const initialState = { loggedUser: null, follows: null, followers: null }


///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            const followState = { ...state }
            const test = {}
            test[action.payload.follow.id] = action.payload

            followState.follows = test
            return followState

        case GET_LOGGED_USER_FOLLOWING:
            const getLoggedUserFollowingState = { ...state }
            getLoggedUserFollowingState.loggedUser = action.payload
            return getLoggedUserFollowingState;

        case GET_FOLLOWING:
            const getFollowingState = { ...state }
            let follows = {}
            action.payload.Followers.forEach(follow => {
                follows[follow.follow.id] = follow
            })
            getFollowingState.follows = follows
            return getFollowingState;

        case GET_FOLLOWERS:
            const getFollowersState = { ...state }
            let follower = {}

            action.payload.Followers.forEach((follow) => {
                follower[follow.follow.id] = follow
            })
            getFollowersState['followers'] = follower
            return getFollowersState;

        case FOLLOW:
            const followStateCopy = {}
            followStateCopy[action.payload.id] = action.payload
            // console.log(followState)
            return followStateCopy


        case UNFOLLOW:
            const unfollowState = { ...state }
            console.log('UNFOLLOW STATE', unfollowState)
            delete unfollowState['follows'][action.payload.follower_info.id]

            return unfollowState;


        default:
            return state;
    }
}

export default followReducer;
