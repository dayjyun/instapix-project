import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
<<<<<<< HEAD
  let post = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  post = post[0]?.Post
=======
  let posts = Object.values(useSelector((state) => state.posts));
  // posts = posts.map(post => post)
>>>>>>> kevin-post-store

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch]);



  return (
    <div>
<<<<<<< HEAD
      {post?.map(p => (
        <>
          <p>{p.caption}</p>
          <img src={p.post_url} alt='preview'></img>
        </>
      ))}
=======
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
>>>>>>> kevin-post-store
    </div>
  )
}

<<<<<<< HEAD
export default PostComponent
=======
export default PostComponent;

// Get post by Id
>>>>>>> kevin-post-store
