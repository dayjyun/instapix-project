import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css";
import { createPost } from "../../store/posts";
import { Redirect, useHistory } from "react-router-dom";

function PostForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [caption, setCaption] = useState("");
  const [post_url, setPost_url] = useState("");
  const history = useHistory();
  const posts = Object.values(useSelector((state) => state.posts));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(createPost({ caption, post_url }))
      .then(() => {
        history.push(`/posts/${+posts.id}`);
      })
      .catch((err) => {
        // setErrors(err);
      });
    setCaption("");
    setPost_url("");
  };

  return (
    <div className="post-form-container">
      <div className="create-new-post">
        <p>Create new post</p>
      </div>
      <div className="caption-url-container">
        <form className="form-here" onSubmit={handleSubmit}>
          <div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <div className="image-render">
            <img src={post_url} alt="post" placeholder="Image URL" />
          </div>
          <div className="form-item">
            <label>Caption: </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <label>Image URL: </label>
            <input
              value={post_url}
              type="text"
              onChange={(e) => setPost_url(e.target.value)}
            />
          </div>

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
