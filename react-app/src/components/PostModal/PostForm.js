import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./PostForm.css";

function PostForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [caption, setCaption] = useState("");
  const [post_url, setPost_url] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
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
          <div className="form-item">
            <label>Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <label>Image URL:</label>
            <input value={post_url} type="text" />
          </div>

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
