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
    console.log(parsedRes)
    dispatch(getFollowing(parsedRes))
}

//GET: all user's followers
export const getFollowersBackend = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/followers`)
    const parsedRes = await response.json()
    console.log(parsedRes)
    dispatch(getFollowers(parsedRes))
}

//POST: a follow
export const postFollowBackend = (input) => async (dispatch) => {
    // console.log(input.)
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
const initialState = { loggedUser: null, follows: null, followers: null }


///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case UNFOLLOW:
            console.log(action.payload)
            const unfollowState = { ...state }
            // for (const key in unfollowState) {
            //     if (key === 'follows') {
            //         delete key
            //     }
            // }

            console.log(unfollowState)
            delete unfollowState['follows'][action.payload.follow.id]
            console.log(unfollowState)

            return unfollowState;

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
            const followState = { ...state }
            const test = {}
            test[action.payload.follow.id] = action.payload

            followState.follows = test
            return followState



        default:
            return state;
    }
}

export default followReducer;
