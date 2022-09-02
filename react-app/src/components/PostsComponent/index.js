import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch]);

  const caption = posts.caption;
  console.log("CAPTION", caption);

  return (
    <div>
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div>{post?.Post?.caption}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostComponent;
