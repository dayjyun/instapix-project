import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  let posts = Object.values(useSelector((state) => state.posts));


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
    </div>
  )
}

export default PostComponent