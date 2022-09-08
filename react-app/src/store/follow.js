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
    const response = await fetch(`/api/follows/users/${userId}/delete`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const parsedRes = await response.json();
        dispatch(deleteFollow(parsedRes))
    }
}

//INITIAL STATE
const initialState = { loggedUser: null, follows: null, followers: null }
// loggedUser = currently logged in users follows
// follows = the user page youre on, their following users
// followers = the user page youre on, their followers

///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            const followState = { ...state };
            const copy = followState.follows;
            const copy2 = followState.loggedUser;
            const copy3 = followState.followers;

            const followArr = Object.values(copy3)

            let dontAdd = false
            for (let i = 0; i < followArr.length; i++) {
                // console.log(followArr[i].follower_info.id, action.payload.follower_info.id)
                if (followArr[i].follower_info.id === action.payload.follower_info.id) {
                    dontAdd = true
                }
            }
            if (!dontAdd) {
                copy3[action.payload.follow.id] = action.payload;
            }

            copy2[action.payload.follow.id] = action.payload;

            followState.followers = copy3
            followState.follows = copy;
            followState.loggedUser = copy2;
            return followState;

        case GET_LOGGED_USER_FOLLOWING:
            const getLoggedUserFollowingState = { ...state }
            const user = {}

            action.payload.Followers.forEach(follow => {
                user[follow.follow.id] = follow
            })
            getLoggedUserFollowingState['loggedUser'] = user
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


        case UNFOLLOW:
            const unfollowState = { ...state }
            console.log(action.payload)
            console.log(unfollowState)
            // if (action.payload.follow.user_id === loggedUser.id){

            // }

            delete unfollowState['follows'][action.payload.follow.id]
            delete unfollowState['loggedUser'][action.payload.follow.id]
            // delete unfollowState['loggedUser']['Followers']['follow'][action.payload.follow.follows_id]
            // console.log(unfollowState.follows)

            // console.log(unfollowState)
            return unfollowState;


        default:
            return state;
    }
}

export default followReducer;
