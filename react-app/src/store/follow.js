//TYPES
const GET_FOLLOWING = 'users/following'




//ACTIONS
export const getFollowing = (follows) => {
    return {
        type: GET_FOLLOWING,
        payload: follows
    }
}



//THUNKS

//get all user's following
export const getFollowingBackend = async (userId) => {
    const response = await fetch(`/api/follows/{userId}/followers`);
    const parsedRes = await response.json();
    dispatchEvent(getFollowing(parsedRes))
}


//INITIAL STATE
const initialState = {}


///REDUCERS
const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING:
            const getFollowingState = {}
            action.payload.follow.forEach(follow => {
                getFollowingState[follow.id] = follow
            })
            return getFollowingState
        default:
            return state;
    }
}

export default followReducer;
