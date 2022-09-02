import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  let post = Object.values(useSelector((state) => state.posts));
  const comments = Object.values(useSelector((state) => state.comments));
  post = post[0]?.Post

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch]);



  return (
    <div>
      {post?.map(p => (
        <>
          <p>{p.caption}</p>
          <img src={p.post_url} alt='preview'></img>
        </>
      ))}
    </div>
  )
}

export default PostComponent
