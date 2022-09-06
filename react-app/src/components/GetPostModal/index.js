import React, { useState } from "react";
import { PostModal } from "../../context/Modal";
import GetPost from "./GetPost";
import "./GetPost.css";

function GetPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="explore-post-container">
      <button className="explore-post-button"
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => setShowModal(true)}
      >
        <img className="explore-post-image" src={post?.post_url}></img>

        <div className="explore-post-text">
          <i className="fa-sharp fa-solid fa-heart"></i>
          <p className="ep-likes">{post?.likes}</p>
          <i className="fa-sharp fa-solid fa-comment"></i>
          <p className="ep-comments">{post?.num_comments}</p>
        </div>
      </button>
      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} />
        </PostModal>
      )}
    </div>
  );
}

export default GetPostModal;
