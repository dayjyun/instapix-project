export const LOAD_ALL_POSTS = 'posts/loadAllPosts';


const loadPosts = (data) => {
    return {
        type: LOAD_ALL_POSTS,
        data
    }
}

export const loadAllPosts = () => async (dispatch) => {
    const res = await fetch(`/api/posts/explorer`);

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts))
    }
}


let initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_ALL_POSTS:
        initialState = {...state};
        action.data.posts.forEach((post) => {
            initialState[post.id] = post;
        });
        return initialState;
      default:
        return state;
    }
  }
