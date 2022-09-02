import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css";
import { createPost } from "../../store/posts";
import { Redirect, useHistory } from "react-router-dom";
import * as postActions from "../../store/posts";

function PostForm() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [caption, setCaption] = useState("");
    const [postUrl, setPostUrl] = useState("");
    const history = useHistory();
    const posts = Object.values(useSelector((state) => state.posts));

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(postActions.createPost({ caption, postUrl }));
    };

    return (
        <div className="post-form-container">
            <div className="create-new-post">
                <p>Create new post</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Caption
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Post Url
                        <input
                            type="password"
                            value={postUrl}
                            onChange={(e) => setPostUrl(e.target.value)}
                        />
                    </label>
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
}


export default PostForm;
