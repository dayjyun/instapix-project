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
          <Link exact to={{ pathname: `/posts/${post?.id}` }}>
            <ul
              key={post?.id}
              className="explore-post-card"
              style={{ backgroundImage: "url(" + post?.post_url + ")" }}
            >
              {/* <img className="explorer-image" src={post?.post_url} /> */}
              <div className="explore-post-text">
                <p className="ept-likes">{post?.likes} Likes</p>
                <p className="ept-comments">{post?.num_comments} Comments</p>
              </div>
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;

// Get all posts in DB
