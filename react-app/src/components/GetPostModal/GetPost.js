import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostsComments from "../CommentComponents/PostsComments";
import EditPostBtn from "../PostsComponent/EditPost/EditPostBtn";
import { useHistory } from "react-router-dom";
import { getCreatedDate } from '../CommentComponents/PostsComments';


function GetPost({ post, user }) {
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);
  const [currPost, setCurrPost] = useState(post);

  let editPostBtn;

  if (currUser?.id === post.user_id) {
    editPostBtn = <EditPostBtn post={post} />;
  }

  return (
    <div className="post-modal-container">
      <div className="image-content-container">
        <img className="image-content" src={post?.post_url} alt='users pic'></img>
      </div>
      <div className="caption-comment-container">
        <div className="user-info-container">
          <div
            className="profile-pic-username"
            onClick={(e) => {
              e.preventDefault()
              history.push(`/users/${post?.user_id}`)
            }}>
            <img
              className="comment-profile-pic"
              src={user?.profile_image}
              alt="preview"
            ></img>
            <div className="post-username-text">
              {user?.username}
            </div>
          </div>
          {editPostBtn}
        </div>
        <div className="post-caption-container">
          <img
            onClick={(e) => {
              e.preventDefault()
              history.push(`/users/${post?.user_id}`)
            }}
            className="comment-profile-pic"
            src={user?.profile_image}
            alt="preview"
          ></img>
          <div
            className="post-username-text"
            onClick={(e) => {
              e.preventDefault()
              history.push(`/users/${post?.user_id}`)
            }}>
            {user?.username}
            <div className="posted-date">{getCreatedDate(post?.created_at)}</div>
          </div>
          <div className="caption-container">{post?.caption}</div>
        </div>
        <div className="post-modal-comments">
          <PostsComments post={post} currPost={currPost} setCurrPost={setCurrPost} />
        </div>
      </div>
    </div>
  );
}

export default GetPost;
