// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
// const GET_USER = 'session/GET_USER'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

// const getUser = (user) => ({
//   type: GET_USER,
//   payload: user
// })

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, firstName, lastName, email, password, profileImage) =>
  async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        first_name: firstName,
        last_name: lastName,
        profile_image: profileImage,
        email,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

// export const getUserBackend = (userId) => async (dispatch) => {
//   const response = await fetch(`/api/users/${userId}`)
//   const parsedRes = await response.json()
//   dispatch(getUser(parsedRes))
// }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    // case GET_USER:
    //   const getUserState = { ...state }
    //   getUserState['getUser'] = action.payload.user
    //   console.log(getUserState)
    //   return getUserState;
    default:
      return state;
  }
}
