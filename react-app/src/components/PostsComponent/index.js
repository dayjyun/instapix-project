import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";
import EditPostForm from "./EditPost";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
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
              <img style={{ width: '500px', height: '500px' }} src={post?.post_url} alt='post_image'></img>
              <div>{post?.caption}</div>
              <div>{post?.likes} Likes</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Render edit post form  */}
      {/* <EditPostForm /> */}
    </div>
  )
}

export default PostComponent
