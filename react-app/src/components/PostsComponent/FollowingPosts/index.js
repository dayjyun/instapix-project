import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../../../store/posts";

function FollowingPosts() {
  const dispatch = useDispatch();
  let posts = Object.values(useSelector((state) => state.posts));

  posts = posts.map((post) => post.Post);

  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <ul>
          {posts?.map((post, i) => (
            <li key={i}>
              <div>{post?.post_url}</div>
              <div>{post?.caption}</div>
              <div>{post?.likes} Likes</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FollowingPosts;
