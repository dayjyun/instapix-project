import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as postActions from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import CreateComment from "../CommentComponents/CreateComment";
import * as userActions from "../../store/users";
import PostsComments from "../CommentComponents/PostsComments";
import EditPostBtn from "../PostsComponent/EditPost/EditPostBtn";

function GetPost({ post }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));
  //   const user = useSelector((state) => Object.values(state.users))[0];
  const userInfo = Object.values(useSelector((state) => state.users));
  const currUser = useSelector((state) => state.session.user);
  const userId = posts.map((post) => post?.user_id)[0];

  console.log("HERE", posts);

  //   posts.user_id = User.id

  useEffect(() => {
    dispatch(postActions.getPost(post?.id));
    dispatch(userActions.getOneUser(post?.user_id));
  }, [dispatch]);

  const getUser = (id) => {
    let user = userInfo.find((user) => user.id === id);
    return user;
  };

  let editPostBtn;

  if (currUser?.id == +userId) {
    editPostBtn = <EditPostBtn post={post}/>;
  }

  return (
    <div className="post-modal-container">
      <div className="image-content-container">
        <img className="image-content" src={post?.post_url}></img>
      </div>
      <div className="caption-comment-container">
        <div className="user-info-container">
          <div className="profile-pic-username">
            <img
              className="comment-profile-pic"
              src={getUser(post?.user_id)?.profile_image}
              alt="preview"
            ></img>
            <div className="post-username-text">
              {getUser(post?.user_id)?.username}
            </div>
          </div>
          {/* {currUser?.id === post.user_id && editPostBtn} */}
          {currUser?.id === post.user_id ? editPostBtn : ""}
        </div>
        <div className="post-caption-container">
          <div className="profile-pic-mini">
            <img
              className="comment-profile-pic"
              src={getUser(post?.user_id)?.profile_image}
              alt="preview"
            ></img>
          </div>
          <div className="post-username-text">
            {getUser(post?.user_id)?.username}
          </div>
          <div className="caption-text">
            <div className="caption-container">{post?.caption}</div>
          </div>
        </div>
        <div className="post-modal-comments">
          <PostsComments post={post} />
        </div>
        {/* Create Comment Modal??? */}
      </div>
    </div>
  );
}

export default GetPost;
