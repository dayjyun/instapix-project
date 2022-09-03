import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../../store/posts";
import "./EditPostForm.css";

function EditPostForm({ setShowMenuButtons, setShowEditPost }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const currUser = useSelector((state) => state.session.user);
  const posts = Object.values(useSelector((state) => state.posts));
  const post_caption = posts?.map((post) => post?.caption);
  const post_image = posts?.map((post) => post?.post_url);
  const [caption, setCaption] = useState(post_caption);

  console.log(currUser)

  const handlePostFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editPost({
        caption,
      })
    ).then(() =>
    history.push(`/posts/${+postId}`)
    );
  };
  // ! Not editing post

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowEditPost(false);
    setShowMenuButtons(false);
  };

  return (
    <div>
      <form>
        <div className="edit-post-container">
          <div className="edit-post-container-top">
            <div>
              <button onClick={handleCancelBtn}>Cancel</button>
            </div>
            <h3>Edit info</h3>
            <div>
              <button type="submit" onSubmit={handlePostFormSubmit}>
                Done
              </button>
            </div>
          </div>
          <div className="edit-post-content">
            <div className="edit-post-image-content">
              <img
                style={{ width: "500px", height: "500px" }}
                src={post_image}
              />
            </div>
            <div className="edit-post-user-content">
              <div className="edit-post-user-info">
                <img
                  className="profile-img-circle-container form-profile-img"
                  src={currUser?.profile_image}
                />
                <h2>{currUser?.username}</h2>
              </div>
              <div className="edit-post-image-caption">
                <label>
                  <textarea
                    maxLength="2000"
                    className="edit-post-text-area"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
