const GET_ALL_USERS = "users/getAllUsers";

const loadAllUsers = (list) => {
  return {
    type: GET_ALL_USERS,
    list,
  };
};

export const allUsers = () => async (dispatch) => {
  const allUsers = await fetch("/api/users/");

  if (allUsers.ok) {
    const resAllUsers = await allUsers.json();
    dispatch(loadAllUsers(resAllUsers));
  }
};

const newState = {};

export default function allUsersReducer(state = newState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      const allUsers = { ...state };
      action.list.users.forEach((user) => {
        allUsers[user.id] = user;
      });
      return allUsers;

    default:
      return state;
  }
}
