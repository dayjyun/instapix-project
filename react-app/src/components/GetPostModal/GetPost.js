import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as postActions from '../../store/posts';
import { useDispatch, useSelector } from "react-redux";


function GetPost() {
    const post = Object.values(useSelector(state => (state.posts)))[0]

    // const [credential, setCredential] = useState("");
    // const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getPost(1))

    }, [dispatch])

    console.log(post)

    return (
        <div className="post-modal-container">
            <div className="image-content-container">
                <p>{post?.Post[0].id}</p>
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
