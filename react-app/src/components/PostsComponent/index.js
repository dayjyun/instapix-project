import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../store/posts";
import { getOneUser } from "../../store/users";
import User from "../UserComponent";
import EditPostBtn from "./EditPost/EditPostBtn";
import "./Posts.css";

function PostComponent() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const posts = Object.values(useSelector((state) => state.posts));
  const currUser = useSelector((state) => state.session.user);
  const userId = posts.map((post) => post?.user_id)[0];
  const user = Object.values(useSelector(state => state.users))[0]

    // console.log(user['userId']);
    console.log(user);

  useEffect(() => {
    dispatch(getPost(+postId));
    dispatch(getOneUser(+userId))
  }, [dispatch]);

  let editPostBtn;

  if (currUser?.id == +userId) {
    editPostBtn = <EditPostBtn />;
  }

  return (
    <div className="post-page">
      {posts?.map((post) => (
        <li key={post?.id} className="post-page-id-card">
          <img
            style={{ width: "500px", height: "500px" }}
            src={post?.post_url}
            alt="post_image"
          ></img>
          <div className="page-page-post-details">
            <div className="post-page-details-top">
              <div className="post-username">
                {/* <img
                  className="profile-img-circle-container form-profile-img"
                  src={currUser?.profile_image}
                  alt="profileImage"
                ></img> */}
                  {/* RENDER POST USER'S PROFILE IMAGE */}
                <h3>{userId}</h3>
              </div>
              {editPostBtn}
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
