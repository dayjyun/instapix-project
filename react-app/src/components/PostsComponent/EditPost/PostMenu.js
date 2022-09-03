import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPostForm from "./EditPostForm";
import './PostMenu.css'

function PostMenu() {
  const [showModal, setShowModal] = useState(false);

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <button className="post-menu-buttons" onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <button onClick={handleCancelBtn}>Cancel</button> */}
          <EditPostForm />
        </Modal>
      )}
    </>
  );
}

export default PostMenu;
