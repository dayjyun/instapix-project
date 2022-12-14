//TYPES
const GET_LOGGED_USER_FOLLOWING = 'user/GET_LOGGED_USER_FOLLOWING'
const GET_FOLLOWING = 'users/GET_FOLLOWS'
const GET_FOLLOWERS = 'users/GET_FOLLOWERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const GET_FOLLOWING_HOME = 'users/GET_FOLLOWING_HOME'

// ACTIONS
export const getFollowingHome = follow => ({
    type: GET_FOLLOWING_HOME,
    payload: follow
})

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

export const postFollow = (follow, userId, blueBtnFollow) => {
    return {
        type: FOLLOW,
        payload: follow,
        userId,
        blueBtnFollow
    }
}
export const deleteFollow = (follow, loggedUserId, blueBtnUnfollow) => {
    return {
        type: UNFOLLOW,
        payload: follow,
        loggedUserId,
        blueBtnUnfollow
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

// GET: all users following for home //different state
export const getFollowingBackendHome = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/follows`);
    if (response.ok) {
        const parsedRes = await response.json();
        dispatch(getFollowingHome(parsedRes))
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
export const postFollowBackend = (input, userId, blueBtnFollow) => async (dispatch) => {
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
        dispatch(postFollow(parsedRes, userId, blueBtnFollow));
        return parsedRes;
    }
}
//DELETE: a follow (unfollow)
export const deleteFollowBackend = (userId, loggedUser, blueBtnUnfollow) => async (dispatch) => {
    const response = await fetch(`/api/follows/users/${userId}/delete`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const parsedRes = await response.json();
        dispatch(deleteFollow(parsedRes, loggedUser, blueBtnUnfollow))
    }
}


//INITIAL STATE
const initialState = { loggedUser: null, follows: null, followers: null }

///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            const followState = { ...state };
            const copy = followState.follows;
            const copy2 = followState.loggedUser;
            const copy3 = followState.followers;

            if (action.userId === action.payload.follow.user_id) {
                copy[action.payload.follow.id] = action.payload;
            }

            if (action.blueBtnFollow) {
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
        case GET_FOLLOWING_HOME:
            const getFollowingStateHome = {}
            action.payload.Followers.forEach(follow => {
                getFollowingStateHome[follow.follow.id] = follow
            })
            return getFollowingStateHome;
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
            if (action.payload.follow.user_id === action.loggedUserId) {
                delete unfollowState['follows'][action.payload.follow.id]
            }
            if (action.blueBtnUnfollow) {
                delete unfollowState['followers'][action.payload.follow.id]
            }
            delete unfollowState['loggedUser'][action.payload.follow.id]
            return unfollowState;

        default:
            return state;
    }
}

export default followReducer;
