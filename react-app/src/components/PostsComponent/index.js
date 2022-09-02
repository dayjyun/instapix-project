import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  let posts = Object.values(useSelector((state) => state.posts));
  // posts = posts.map(post => post)

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch]);



  return (
    <div>
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post?.id}>
              <div>{post?.post_url}</div>
              <div>{post?.caption}</div>
              <div>{post?.likes} Likes</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostComponent
