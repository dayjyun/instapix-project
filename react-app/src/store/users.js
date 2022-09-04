const LOAD_USERS = 'users/loadUsers';
const GET_USER = 'users/getUser';

// const loadUsers = (data) => {
//     return {
//         type: LOAD_USERS,
//         data
//     }
// }

const getUser = (data) => {
    return {
        type: GET_USER,
        data
    }
}

// export const getAllUsers = () => async (dispatch) => {
//     const res = await fetch('/api/users')

//     if (res.ok) {
//         const users = await res.json();
//         dispatch(loadUsers(users));
//     };
// };

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
    case GET_USER:
        // console.log(action.data);
        return { ...state, [action.data.id]: action.data}
    default:
      return state;
  }
}
