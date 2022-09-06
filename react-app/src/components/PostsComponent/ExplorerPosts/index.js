import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../../store/posts";
import GetPostModal from "../../GetPostModal";
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
            <div className="explore-post-card">
              <GetPostModal post={post} />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;
