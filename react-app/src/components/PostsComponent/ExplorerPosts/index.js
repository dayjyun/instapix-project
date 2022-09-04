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
    <div className="explore-page">
      <div className="explore-post">
        {posts?.map((post) => (
          <li key={post?.id} className="explore-post-card">
            <Link exact to={{ pathname: `/posts/${post?.id}` }}>
              {/* <img className="explorer-image" src={post?.post_url} /> */}
              <div className="explore-post-wrapper" style={{ backgroundImage: "url(" + post?.post_url + ")" }}>
                <div className="explore-post-text ep-likes">{post?.likes} Likes</div>
                <div className="explore-post-text ep-comments-count">{post?.num_comments} Comments</div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;

// Get all posts in DB
