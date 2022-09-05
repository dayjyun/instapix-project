import React, { useState } from "react";
import { PostModal } from "../../context/Modal";
import GetPost from "./GetPost";
import "./GetPost.css";

function GetPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>GETPOSTTEST</button>
      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} />
        </PostModal>
      )}
    </>
  );
}

export default GetPostModal;
