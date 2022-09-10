import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPosts } from "../../../store/posts";
import GetPostModal from "../../GetPostModal";
import "./index.css";

const uniqueIndex = () => {
  const indexes = [];
  while (indexes.length !== 25) {
    const randomIndex = Math.floor(Math.random() * 30);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
};

let i;

function ExplorerPosts() {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector((state) => state.posts));
  const likes = useSelector((state) => state.likes);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch, likes, comments]);
  useEffect(() => {
    i = uniqueIndex();
  }, []);

  return (
    <div className="explore-page">
      <div className="explore-post">
        {i?.map((i) => (
          <li key={posts[i].id} className="explore-post-wrap">
            <div className="explore-post-card">
              <GetPostModal post={posts[i]} user={posts[i]?.User} />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default ExplorerPosts;
