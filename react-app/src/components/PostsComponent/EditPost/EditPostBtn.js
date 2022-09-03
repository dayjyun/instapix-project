import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deletePost } from "../../../store/posts";
import PostMenu from "./PostMenu";

function EditPostBtn() {
    const dispatch = useDispatch()
    const history = useHistory()
    // postId?
  const [showModal, setShowModal] = useState(false);

  const handleDeletePostBtn = (e) => {
    e.preventDefault()
    dispatch(deletePost(1))
  }

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
    alert('Post successfully deleted')
    history.pushState('/')
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Menu Button...</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button onClick={handleDeletePostBtn}>Delete</button>
          <PostMenu />
          <button onClick={handleCancelBtn}>Cancel</button>
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
