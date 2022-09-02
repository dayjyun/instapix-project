import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../store/posts";
// import * as postActions from "../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  console.log(posts[0]?.Post[0].caption);

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch]);

  return (
    <div>
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div>{post?.Post[0]?.caption}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostComponent;
