import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../store/posts";
// import * as postActions from "../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
//   const post = post[postId]
  console.log(posts[0]?.Post[0].caption);

  useEffect(() => {
    dispatch(getPost(+postId));
    // dispatch(postActions.getPost(postId));
  }, [dispatch, postId]);

  return (
    <div>
      <div>
        <ul>
          {posts?.map((p) => (
            <li key={p.id}>
              <div>{p[0]?.Post[0].caption}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostComponent;
