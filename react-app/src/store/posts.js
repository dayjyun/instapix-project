const GET_ALL_POSTS = "posts/getAllPosts";
const GET_FOLLOWING_POSTS = 'posts/getFollowingPosts';
const GET_POST = 'posts/getPost';
const CREATE_POST = 'posts/createPost';
const EDIT_POST = 'posts/editPost';
const DELETE_POST = 'posts/deletePost';


// Get all posts
const loadPosts = (data) => {
  return {
    type: GET_ALL_POSTS,
    data,
  };
};

export const loadAllPosts = () => async (dispatch) => {
  const res = await fetch(`/api/posts/explorer`);

  if (res.ok) {
    const posts = await res.json();
    dispatch(loadPosts(posts));
  }
};


// Get posts from users I am following
const followingPosts = (list) => {
  return {
    type: GET_FOLLOWING_POSTS,
    list,
  }
}

export const getFollowingPosts = () => async (dispatch) => {
  const allFollowingPosts = await fetch('/api/posts');

  if (allFollowingPosts.ok) {
    const res = await allFollowingPosts.json();
    dispatch(followingPosts(res.Posts))
  }
}


// Get post
const getCurrentPost = (post) => {
  return {
    type: GET_POST,
    post,
  }
}

export const getPost= (postId) => async (dispatch) => {
  const post = await fetch(`/api/posts/${postId}`);

  if (post.ok) {
    const res = await post.json()
    dispatch(getCurrentPost(res))
  }
}


let initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      initialState = { ...state };
      action.data.posts.forEach((post) => {
        initialState[post.id] = post;
      });
      return initialState;
    default:
      return state;
  }
}
