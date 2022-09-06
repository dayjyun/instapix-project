import React, { useEffect } from "react";
import * as postActions from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/users";
import PostsComments from "../CommentComponents/PostsComments";
import EditPostBtn from "../PostsComponent/EditPost/EditPostBtn";
import { useHistory } from "react-router-dom";

function GetPost({ post }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const allUsers = Object.values(useSelector(state => state.users));
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(postActions.getPost(post?.id));
    dispatch(userActions.getAllUsers());
  }, [dispatch]);

  const getUser = (id) => {
    let user = allUsers.find((user) => user.id === id);
    return user;
  };

  const userProfile = (userId) => {
    history.push(`/users/${userId}`)
    history.go(0)
  }

  let editPostBtn;

  if (currUser?.id == post.user_id) {
    editPostBtn = <EditPostBtn post={post} />;
  }

  return (
    <div className="post-modal-container">
      <div className="image-content-container">
        <img className="image-content" src={post?.post_url}></img>
      </div>
      <div className="caption-comment-container">
        <div className="user-info-container">
          <div className="profile-pic-username" onClick={() => userProfile(post?.user_id)}>
            <img
              className="comment-profile-pic"
              src={getUser(post?.user_id)?.profile_image}
              alt="preview"
            ></img>
            <div className="post-username-text">
              {getUser(post?.user_id)?.username}
            </div>
          </div>
          {currUser?.id === post.user_id ? editPostBtn : "menu"}
          {/* {editPostBtn} */}
        </div>
        <div className="post-caption-container">
          <img
            onClick={() => userProfile(post?.user_id)}
            className="comment-profile-pic"
            src={getUser(post?.user_id)?.profile_image}
            alt="preview"
          ></img>
          <div className="post-username-text" onClick={() => userProfile(post?.user_id)}>
            {getUser(post?.user_id)?.username}
          </div>
          <div className="caption-text">
            <div className="caption-container">{post?.caption}</div>
          </div>
        </div>
        <div className="post-modal-comments">
          <PostsComments post={post} />
        </div>
      </div>
    </div>
  );
}

export default GetPost;
