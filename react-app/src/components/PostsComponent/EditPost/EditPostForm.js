import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../../store/posts";

function EditPostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  // const posts = Object.values(useSelector(state => state.posts))
  const [caption, setCaption] = useState(""); // render to grab current caption

  // useEffect(() => {
  //     dispatch(editPost(+postId))
  // }, [dispatch])

  const handlePostFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editPost({
        caption,
      })
    );
    history.push(`/posts/${+postId}`);
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    // setShowModal(False)
  };

  return (
    <div>
      <form onSubmit={handlePostFormSubmit}>
        <div>
          <div>
            <label>Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Done</button>
          </div>
          <div>
            <button type={handleCancelBtn}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
