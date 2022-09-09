import React, { useState } from "react";
import { PostModal } from "../../../context/Modal";
import GetPost from "../../GetPostModal/GetPost";
import "../../GetPostModal/index.css";
import "../../GetPostModal/GetPost.css";
import { useSelector } from "react-redux";


function FeedPostModalViewStr({ post }) {
  const [showModal, setShowModal] = useState(false);

  const posts = useSelector(state => Object.values(state.posts));
  console.log(post);

  let viewStr;

  if (post?.Comments?.length) {
    viewStr = `View all ${post?.Comments?.length} comments`;
  } else {
    viewStr = ''
  };

  return (
    <>
      <button
        className="view-all-comments-btn"
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => setShowModal(true)}
      >{viewStr}
      </button>
      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} />
        </PostModal>
      )}
    </>
  );
}

function FeedPostModalCommentBtn({ post }) {
    const [showModal, setShowModal] = useState(false);
    const posts = useSelector(state => Object.values(state.posts));


    return (
      <>
        <button
          className="view-all-comments-btn"
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={() => setShowModal(true)}>
            <i className="fa-regular fa-comment comment-bubble"></i>
        </button>
        {showModal && (
          <PostModal onClose={() => setShowModal(false)}>
            <GetPost post={post} />
          </PostModal>
        )}
      </>
    );
  }

export {FeedPostModalViewStr, FeedPostModalCommentBtn}
