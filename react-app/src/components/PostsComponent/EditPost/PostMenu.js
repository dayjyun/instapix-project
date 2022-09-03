import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPostForm from "./EditPostForm";

function PostMenu() {
  const [showModal, setShowModal] = useState(false);

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button onClick={handleCancelBtn}>Cancel</button>
          <EditPostForm />

        </Modal>
      )}
    </>
  );
}

export default PostMenu;
