import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../../store/posts";

function ExplorerPosts() {
  const dispatch = useDispatch();

  let posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post?.id}>
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

export default ExplorerPosts;

// Get all posts in DB
