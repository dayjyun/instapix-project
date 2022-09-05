import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../../store/posts";
import "./EditPostForm.css";

function EditPostForm({ setShowMenuButtons, setShowEditPost, post }) {
  const dispatch = useDispatch();
  const userInfo = Object.values(useSelector((state) => state.users))[0];
  const [caption, setCaption] = useState(post.caption);
  const curr_img = post.post_url;

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
              <button className="edit-post-form-button ep-cancel" onClick={handleCancelBtn}>Cancel</button>
            </div>
            <h3>Edit info</h3>
            <div>
              <button className="edit-post-form-button ep-done" type="submit">Done</button>
            </div>
          </div>
          <div className="edit-post-content">
            <div className="edit-post-image-content">
              <img className="edit-post-image" src={curr_img} />
            </div>
            <div className="edit-post-user-content">
              <div className="edit-post-user-info">
                <img
                  className="profile-img-circle-container form-profile-img"
                  src={userInfo?.profile_image}
                />
                <h3>{userInfo?.username}</h3>
              </div>
              <div className="edit-post-image-caption">
                <label></label>
                <textarea
                  maxLength="2200"
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
