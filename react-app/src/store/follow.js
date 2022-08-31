//TYPES
const GET_FOLLOWING = 'users/following'




//ACTIONS
export const getFollowing = (userId) => {
    return {
        type: GET_FOLLOWING,
        payload: userId
    }
}



//THUNKS

//get all user's following
export const getFollowingBackend = (userId) => {
    const response = await fetch(`/api/follows/{userId}/followers`);
    const parsedRes = await response.json();
    dispatchEvent(getFollowing(parsedRes))
}


//INITIAL STATE




///REDUCERS
