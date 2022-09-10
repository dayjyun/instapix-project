import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css";
import { useHistory } from "react-router-dom";
import * as postActions from "../../store/posts";
// import validator from 'validator'

function PostForm({ closeModal }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [caption, setCaption] = useState("");
    const [postUrl, setPostUrl] = useState("");
    const history = useHistory();
    // const posts = Object.values(useSelector((state) => state.posts));
    const currUser = useSelector(state => state.session.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(postActions.createPost({ caption, postUrl }))
            .then(() => {
                closeModal()
            })
        setPostUrl('')
        setCaption('')
        history.push(`/users/${currUser?.id}`)
        history.go()
    }

    return (
        <div className="post-form-container">
            <div className="create-new-post">
                <p>Create new post</p>
                {caption && (
                    <div className="share-button-container">
                        <button type='submit' onClick={handleSubmit}>Share</button>
                    </div>
                )}
            </div>
            <div className="form-container">
                <div className="form-image">
                    {postUrl && validator.isURL(postUrl) && (
                        // <div style={{ backgroundImage: `${postUrl}` }}></div>
                        <img src={postUrl} alt='previewImage'></img>
                    )}
                </div>
                <div className="post-caption-form-container">
                    <div className="post-caption-form-area">
                        <div className='post-username'>
                            <img className="profile-img-circle-container form-profile-img" src={currUser?.profile_image} alt="profileImage"></img>
                            <h3>{currUser?.username}</h3>
                        </div>
                        <form>
                            <ul>
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                            <label>
                                <textarea
                                    className="text-area"
                                    value={caption}
                                    placeholder='Write a caption...'
                                    onChange={(e) => {
                                        setCaption(e.target.value)
                                    }}
                                    maxLength='2000'
                                    required
                                />
                            </label>
                        </form>
                        <form>
                            <div className="char-count-area">
                                <input
                                    className="image-url"
                                    type="url"
                                    value={postUrl}
                                    placeholder='Image Url'
                                    onChange={(e) => setPostUrl(e.target.value)}
                                />
                                <p style={{ color: 'lightgray' }}>{caption.length}/2000</p>
                            </div>
                            {/* <button type="submit">Post</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PostForm;
