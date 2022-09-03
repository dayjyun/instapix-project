import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../../store/posts";

function EditPostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const posts = Object.values(useSelector(state => state.posts))
  const [caption, setCaption] = useState(posts?.map((post) => post?.caption))

  const handlePostFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editPost({
        caption,
      })
    );
    history.push(`/posts/${+postId}`);
  };

  return (
    <div>
      <form onSubmit={handlePostFormSubmit}>
        <div>
          <h3>Edit info</h3>
          <div>
            <button type="submit">Done</button>
          </div>
          <div>
            <h1>POST URL</h1>
          </div>
          <div>
            <label>Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
