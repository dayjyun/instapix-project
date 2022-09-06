import React, { useState } from "react";
import { PostModal } from "../../context/Modal";
import GetPost from "./GetPost";
import "./index.css";
import "./GetPost.css";

function GetPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="explore-post-button-wrap"
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => setShowModal(true)}
      >
        <img className="explore-post-image" src={post?.post_url}></img>

        <div className="explore-post-text">
          <div className="explore-post-text-likes">
            <i className="fa-sharp fa-solid fa-heart"></i>
            <p className="ep-likes">{post?.likes}</p>
          </div>
          <div className="explore-post-text-comments">
            <i className="fa-sharp fa-solid fa-comment"></i>
            <p className="ep-comments">{post?.num_comments}</p>
          </div>
        </div>
      </button>
      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} />
        </PostModal>
      )}
    </>
  );
}

export default GetPostModal;
