import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../../store/posts";

function EditPostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const posts = Object.values(useSelector(state => state.posts))
  const post_caption = posts?.map((post) => post?.caption);
  const post_image = posts?.map((post) => post?.post_url);
  const [caption, setCaption] = useState(post_caption)

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
            {/* <h1>POST URL</h1> */}
            <img style={{ width: "500px", height: "500px" }} src={post_image} />
          </div>
          <div>
            <label>Caption</label>
            <input
              type="text" // !caption should be bigger
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
