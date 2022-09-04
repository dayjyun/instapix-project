import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as postActions from '../../store/posts';
import { useDispatch, useSelector } from "react-redux";
import CreateComment from "../CommentComponents/CreateComment";
import * as userActions from '../../store/users';
import PostsComments from "../CommentComponents/PostsComments";
import EditPostBtn from "../PostsComponent/EditPost/EditPostBtn";


function GetPost() {
    const post = useSelector(state => Object.values(state.posts))[0]
    const user = useSelector(state => Object.values(state.users))[0]

    console.log(user);


    // const [credential, setCredential] = useState("");
    // const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getPost(1));
        dispatch(userActions.getOneUser(1));
    }, [dispatch])

    // console.log('THIS', post)

    return (
        <div className="post-modal-container">
            <div className="image-content-container">
                {/* <h1>goodbye world</h1> */}
            {/* <div className="image-content" style={{ backgroundImage: 'url(' + post?.post_url + ')' }}>
            </div> */}
            <img className="image-content" src={post?.post_url}></img>
            </div>
            <div className="caption-comment-container">
                <div className="user-info-container">
                    <div className="profile-pic-username">
                    <img className="comment-profile-pic" src={user?.profile_image} alt='preview'></img>
                    <div className="post-username-text">{user?.username}</div>
                    </div>
                    <EditPostBtn />
                </div>
                <div className="post-caption-container">
                    <div className="profile-pic-mini">
                    <img className="comment-profile-pic" src={user?.profile_image} alt='preview'></img>
                    </div>
                    <div className="post-username-text">{user?.username}</div>
                    <div>{post?.caption}</div>
                </div>
                <div className="post-modal-comments">
                    {/* <p>Comments</p> */}
                    {/* <div className="create-comment-container"> */}
                        <PostsComments post={post}/>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default GetPost;
