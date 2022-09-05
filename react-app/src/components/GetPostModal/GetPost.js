import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as postActions from '../../store/posts';
import { useDispatch, useSelector } from "react-redux";
import CreateComment from "../CommentComponents/CreateComment";
import * as userActions from '../../store/users';
import PostsComments from "../CommentComponents/PostsComments";
import EditPostBtn from "../PostsComponent/EditPost/EditPostBtn";
import * as commentActions from '../../store/comments'
import { useHistory } from 'react-router-dom'



function GetPost({ post }) {
    // const post = useSelector(state => Object.values(state.posts))[0]
    const user = useSelector(state => Object.values(state.users))[0]
    const comments = Object.values(useSelector(state => state.comments))
    const history = useHistory()
    console.log(comments)


    // const [credential, setCredential] = useState("");
    // const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(postActions.getPost(post?.id));
        dispatch(userActions.getOneUser(post?.user_id));
        dispatch(commentActions.loadPostComments(post?.id))
    }, [dispatch])

    // console.log('THIS', post)

    return (
        <div className="post-modal-container">
            <div className="image-content-container">
                {/* <h1>goodbye world</h1>
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
                    <div style={{ backgroundColor: 'transparent' }} className="profile-pic-mini">
                        <button className="profile-pic-button" onClick={e => {
                            history.push(`/users/${user?.id}`)
                        }}>
                            <img className="profile-caption-pic" src={user?.profile_image} alt='preview'></img>
                        </button>
                    </div>
                    <span>
                        <a
                            href={`/users/${user?.id}`}
                            style={{ fontWeight: '900', fontSize: '16px' }}>{user?.username}
                        </a>
                        <span
                            style={{ fontSize: '14px' }}> {post?.caption}
                        </span>
                    </span>

                    {/* {comments?.map(comment => (
                        <div>
                            <p>{post?.caption}</p>
                        </div>
                    ))} */}
                </div>
                <div className="post-comment-container">
                    {comments?.map(comment => (
                        <div className="post-caption-container">
                            <div style={{ backgroundColor: 'transparent' }} className="profile-pic-mini">
                                <button
                                    className="profile-pic-button"
                                    onClick={e => {
                                        e.preventDefault()
                                        history.push(`/users/${comment?.user?.id}`)
                                    }}
                                >
                                    <img className="profile-caption-pic" src={comment?.user?.profile_image}></img>
                                </button>
                            </div>
                            <span>
                                <a
                                    href={`/users/${user?.id}`}
                                    style={{ fontWeight: '900', fontSize: '16px' }}>{comment?.user?.username}
                                </a>
                                <span
                                    style={{ fontSize: '14px' }}> {comment?.body}
                                </span>
                            </span>
                        </div>

                    ))}
                </div>
                <div className="add-comment-section">
                    <h1>add comments here</h1>
                </div>
            </div>
        </div>
    );
}
// <div className="profile-pic-mini">
//     <img className="comment-profile-pic" src={comment?.user?.profile_image}></img>
// </div>


{/* <div className="profile-pic-mini">
    <img className="comment-profile-pic" src={user?.profile_image} alt='preview'></img>
</div>
<div className="post-username-text">{user?.username}</div>
<div>{post?.caption}</div> */}



{/* <div className="post-modal-comments">
    <PostsComments post={post} />
</div> */}
//profile-pic-mini
//comment-profile-pic
//post-username-text

export default GetPost;
