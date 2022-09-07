const LOAD_USERS = 'users/loadUsers';
const GET_USER = 'users/getUser';

const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        payload: users
    }
}

const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export const getAllUsers = () => async (dispatch) => {
    const res = await fetch('/api/users')

    if (res.ok) {
        const users = await res.json();
        dispatch(loadUsers(users));
        return res;
    };
};

export const getOneUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const user = await res.json();
        dispatch(getUser(user));
    }

}

const newState = {};

export default function userReducer(state = newState, action) {
    switch (action.type) {
        // case GET_USER:
        //     return { ...state, [action.data.id]: action.data }
        case GET_USER:
            // return { ...state, [action.payload.id]: action.payload }
            return { [action.payload.id]: action.payload }

        case LOAD_USERS:
            // console.log(action);
            const allUserState = { ...state }
            action.payload.users.forEach(user => {
                allUserState[user.id] = user
            })
            return allUserState
        default:
            return state;
    }
}
