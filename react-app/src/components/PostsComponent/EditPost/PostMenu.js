import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPostForm from "./EditPostForm";

function PostMenu() {
  const [showModal, setShowModal] = useState(false);

  const handleCancelBtn=(e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <>
      <button>Delete</button>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm />
        </Modal>
      )}
      <button onClick={handleCancelBtn}>Cancel</button>
    </>
  );
}

export default PostMenu;
