import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";
// import { getOneUser } from "../../store/users";
// import User from "../UserComponent";
import EditPostBtn from "./EditPost/EditPostBtn";
import "./Posts.css";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  const currUser = useSelector((state) => state.session.user);
  const userId = posts.map((post) => post?.user_id)[0];

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch, postId]);

  let editPostBtn;

  if (currUser?.id === +userId) {
    editPostBtn = <EditPostBtn />;
  }

  return (
    <div className="post-page">
      {posts?.map((post, i) => (
        <li key={i} className="post-page-id-card">
          <img
            style={{ width: "500px", height: "500px" }}
            src={post?.post_url}
            alt="post_image"
          ></img>
          <div className="page-page-post-details">
            <div className="post-page-details-top">
              <div className="post-username">
                <h3>{userId}</h3>
              </div>
              {currUser?.id === post.user_id ? editPostBtn : ""}
            </div>
            <div className="post-page-user-details">
              <div>{post?.caption}</div>
            </div>
            <div className="post-page-meta-data">
              <div>{post?.likes} Likes</div>
              <div>{post?.created_at}</div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}

export default PostComponent;
