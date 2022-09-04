import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllPosts } from "../../../store/posts";
import "./index.css";

function ExplorerPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  return (
    <div className="explore-page">
      <div className="explore-post">
        {posts.map((post) => (
          <li key={post?.id} className="explore-post-wrap">
            <Link to={{ pathname: `/posts/${post.id}` }}>
              <div
                className="explore-post-card"
                style={{ backgroundImage: "url(" + post?.post_url + ")" }}
              >
                <div className="explore-post-text">
                  <p className="ept-likes">{post?.likes} Likes</p>
                  <p className="ept-comments">{post?.num_comments} Comments</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;
