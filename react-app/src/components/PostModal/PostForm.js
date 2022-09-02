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
    const currUser = useSelector(state => state.session.user)
    console.log(currUser)



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(postActions.createPost({ caption, postUrl }));
        const postId = posts[posts.length - 1].id
        history.push(`/posts/${postId}`)
    };

    return (
        <div className="post-form-container">
            <div className="create-new-post">
                <p>Create new post</p>
                {caption && (
                    <button type='submit'>Share</button>
                )}
            </div>
            <div className="form-container">
                <div className="form-image">
                    {postUrl && (
                        <img style={{ width: '32vw', height: '64.4vh' }} src={postUrl}></img>
                    )}
                </div>
                <div className="post-caption-form-container">
                    <div className="post-caption-form-area">
                        <div className='post-username'>
                            <img className="profile-img-circle-container form-profile-img" src={currUser?.profile_image} alt="profileImage"></img>
                            <h3>{currUser?.username}</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <ul>
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                            <label>
                                <textarea className="text-area"
                                    value={caption}
                                    placeholder='Write a caption...'
                                    onChange={(e) => setCaption(e.target.value)}
                                    maxLength='2000'
                                    required
                                />
                            </label>
                        </form>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Post Url
                                <input
                                    type="text"
                                    value={postUrl}
                                    onChange={(e) => setPostUrl(e.target.value)}
                                />
                            </label>
                            {/* <button type="submit">Post</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


{/* <label>
                                Post Url
                                <input
                                    type="text"
                                    value={postUrl}
                                    onChange={(e) => setPostUrl(e.target.value)}
                                />
                            </label>
                            <button type="submit">Post</button> */}

export default PostForm;
