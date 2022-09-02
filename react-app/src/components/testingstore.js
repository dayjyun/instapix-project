// import * as hashtagActions from "../store/hashtags";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import * as likeActions from "../store/likes";
import * as postActions from '../store/posts'

const TestingComponent = () => {
  const dispatch = useDispatch();
//   const history = useHistory();
//   const hashtags = Object.values(useSelector((state) => state.hashtags));
//   const likes = Object.values(useSelector((state) => state.likes));
    const posts = Object.values(useSelector((state ) => state.posts));
    const comments = posts[0]?.Post[0]?.Comments
    console.log(comments)
//   useEffect(() => {
//     dispatch(hashtagActions.fetchAllHashtags());
//     dispatch(likeActions.fetchLike(1));
//   }, [dispatch]);

    useEffect(() => {
        dispatch(postActions.getPost(1));
    }, [dispatch])

//   const handleOnClick = (e) => {
//     e.preventDefault();
//     dispatch(likeActions.unlike(2));
//   };

  return (
    <div>
      <div>
        {posts?.map((post) => (
          <li key={post.id}>
            <div>{posts[0]?.Post[0].caption}</div>
            {/* <div>{post.post_url}</div> */}
          </li>
        ))}
        {comments?.map(comment => (
            <li key={comment.id}>{comment?.body}</li>
        ))}
        {/* {hashtags?.map((hashtag) => (
          <li key={hashtag?.id}>
            <div>hashtagid: {hashtag.id}</div>
            <div>hashtag_value: {hashtag.hashtag_value}</div>
          </li>
        ))} */}
      </div>
      {/* <div>
        {likes.map((like) => (
          <div key={like.id}>
            <li>{like.post_id}</li>
            <li>{like.user_id}</li>
          </div>
        ))}
      </div> */}
      {/* <button onClick={handleOnClick}>LIKE</button> */}
    </div>
  );
};

export default TestingComponent;
