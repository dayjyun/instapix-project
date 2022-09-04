import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";
import EditPostBtn from "./EditPost/EditPostBtn";
import "./Posts.css";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getPost(+postId));
  }, [dispatch]);

  return (
    <div className="post-page">
      {posts?.map((post) => (
        <li key={post?.id} className="post-id-card">
          <img
            style={{ width: "500px", height: "500px" }}
            src={post?.post_url}
            alt="post_image"
          ></img>
          <div className="page-post-details">
            <div className="post-details-top">
              <div className="post-username">
                <img
                  className="profile-img-circle-container form-profile-img"
                  src={currUser?.profile_image}
                  alt="profileImage"
                ></img>
                <h3>{currUser?.username}</h3>
              </div>
              <EditPostBtn />
            </div>
            <div className="post-user-details">
              <div>{post?.caption}</div>
              <div>{post?.likes} Likes</div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}

export default PostComponent;
