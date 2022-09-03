import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllPosts } from "../../../store/posts";
import "./index.css";

function ExplorerPosts() {
  const dispatch = useDispatch();

  let posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  return (
    <div className="explorer-page">
      <div className="explorer-post">
        {posts?.map((post) => (
          <li key={post?.id} className="explorer-card">
            <Link exact to={{ pathname: `/posts/${post?.id}` }}>
              <img className="explorer-image" src={post?.post_url} />
              {/* <div>{post?.caption}</div> */}
              <div>{post?.likes} Likes</div>
              <div>{post?.num_comments} Comments</div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;

// Get all posts in DB
