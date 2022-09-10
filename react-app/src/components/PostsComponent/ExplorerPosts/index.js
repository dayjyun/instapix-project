import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../../store/posts";
import GetPostModal from "../../GetPostModal";
import "./index.css";

function ExplorerPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const likes = useSelector(state => state.likes)
  const comments = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch, likes, comments]);


  return (
    <div className="explore-page">
      <div className="explore-post">
        {posts?.map((post) => (
          <li key={post?.id} className="explore-post-wrap">
            <div className="explore-post-card">
              <GetPostModal post={post} user={post?.User} />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;
