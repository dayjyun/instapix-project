import React, { useState } from "react";
import { PostModal } from "../../../context/Modal";
import GetPost from "../../GetPostModal/GetPost";
import "../../GetPostModal/index.css";
import "../../GetPostModal/GetPost.css";


function FeedPostModalViewStr({ post, user }) {
  const [showModal, setShowModal] = useState(false);

  let viewStr;

  if (post?.Comments?.length) {
    viewStr = `View all ${post?.Comments?.length} comments`;
  } else {
    viewStr = ''
  };

  return (
    <>
      <button
        className="load-comments-button"
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => setShowModal(true)}
      >{viewStr}
      </button>
      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} user={user} />
        </PostModal>
      )}
    </>
  );
}

function FeedPostModalCommentBtn({ post, user }) {
  const [showModal, setShowModal] = useState(false);

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
          <GetPost post={post} user={user} />
        </PostModal>
      )}
    </>
  );
}

export { FeedPostModalViewStr, FeedPostModalCommentBtn }
