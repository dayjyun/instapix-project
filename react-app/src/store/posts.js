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
};

export const getFollowingPosts = () => async (dispatch) => {
  const allFollowingPosts = await fetch('/api/posts');

  if (allFollowingPosts.ok) {
    const resAllPosts = await allFollowingPosts.json();
    dispatch(followingPosts(resAllPosts.Posts))
  }
};


// Get post
const getCurrentPost = (post) => {
  return {
    type: GET_POST,
    post,
  }
};

export const getPost = (postId) => async (dispatch) => {
  const post = await fetch(`/api/posts/${postId}`);

  if (post.ok) {
    const resPost = await post.json()
    dispatch(getCurrentPost(resPost));
    return post
  }
};


// Create post
const newPost = (post) => {
  return {
    type: CREATE_POST,
    post,
  }
};

export const createPost = (postDetails) => async (dispatch) => {
  const { post_url, caption } = postDetails;
  const formData = new FormData();

  formData.append("post_url", post_url)
  if (caption) formData.append('caption', caption)

  const post = await fetch(`/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData,
  })

  const resPost = await post.json()
  dispatch(newPost(resPost))
};


// Edit post
// const updatePost = (post) => {
//   return {
//     type: EDIT_POST,
//     post,
//   };
// };

// export const editPost = (postDetails) => async (dispatch) => {
//   const post = await fetch(`/api/posts/${postDetails.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(post)
//   })

//   if (post.ok) {
//     const resPost = post.json()
//     dispatch(updatePost(resPost));
//   }
// };


// Delete post
const removePost = (post) => {
  return {
    type: DELETE_POST,
    post
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const post = await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  })

  if (post.ok) {
    dispatch(removePost(post))
  }
};


let initialState = {};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      const newAllPostsState = { ...state };
      action.data.Posts.forEach((post) => {
        newAllPostsState[post.id] = post;
      });
      return newAllPostsState;

    case GET_FOLLOWING_POSTS:
      const newFollowingPostsState = { ...state }
      action.list.Posts.forEach(post => {
        newFollowingPostsState[post.id] = post;
      })
      return newFollowingPostsState;;

      case GET_POST:
        return {
          ...state,
          [action.post.id]: action.post
        };

      case CREATE_POST:
        return {
          ...state,
          [action.post.id]: action.post
        }

      case EDIT_POST:
        return {
          ...state,
          [action.post.id]: action.post
        };

      case DELETE_POST:
        const removedPostState = { ...state }
        delete removedPostState[action.id]
        return removedPostState;

    default:
      return state;
  }
}