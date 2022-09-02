import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";


function GetPost() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

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
        <div className="post-modal-container">
            <div className="image-content-container">
                <p>Image</p>
            </div>
            <div className="caption-comment-container">
                <div className="post-modal-topright-info">
                    <div className="profile-pic-mini">
                        <img src='https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2011/11/square-format-01.jpg?resize=600%2C600&ssl=1' className="post-user-profile-pic"></img>
                    </div>
                    <p>User Info</p>
                </div>
                <div className="post-modal-topright-info">
                    <div className="profile-pic-mini">
                        <img src='https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2011/11/square-format-01.jpg?resize=600%2C600&ssl=1' className="post-user-profile-pic"></img>
                    </div>
                    <p>Caption</p>
                    </div>
                <div className="post-modal-comments"><p>Comments</p></div>
            </div>
        </div>
    );
}

export default GetPost;
