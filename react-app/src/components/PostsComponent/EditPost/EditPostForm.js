import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPost } from "../../../store/posts";
import "./EditPostForm.css";

function EditPostForm({ setShowMenuButtons, setShowEditPost, post }) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  // const currUser = useSelector((state) => state.session.user);
  const posts = Object.values(useSelector((state) => state.posts));
  const post_caption = posts?.map((post) => post?.caption);
  const post_image = posts?.map((post) => post?.post_url);
  const userInfo = Object.values(useSelector((state) => state.users))[0];
  const [caption, setCaption] = useState("");
  const current_post_caption = caption[0];
  console.log(postId);
  const handlePostFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editPost({
        id: post.id,
        caption
      })
    ).then(() => {
      setShowEditPost(false);
      setShowMenuButtons(false);
    });
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowEditPost(false);
    setShowMenuButtons(false);
  };

  return (
    <div>
      <form onSubmit={handlePostFormSubmit}>
        <div className="edit-post-container">
          <div className="edit-post-container-top">
            <div>
              <button onClick={handleCancelBtn}>Cancel</button>
            </div>
            <h3>Edit info</h3>
            <div>
              <button type="submit">Done</button>
            </div>
          </div>
          <div className="edit-post-content">
            <div className="edit-post-image-content">
              <img className="edit-post-image" src={post_image[0]} />
            </div>
            <div className="edit-post-user-content">
              <div className="edit-post-user-info">
                <img
                  className="profile-img-circle-container form-profile-img"
                  src={userInfo?.profile_image}
                />
                <h3>{userInfo?.username}</h3>
                {/* Profile Image */}
                {/* username of post_id == User.id */}
              </div>
              <div className="edit-post-image-caption">
                <label>Caption</label>
                <textarea
                  maxLength="2000"
                  className="edit-post-text-area"
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
