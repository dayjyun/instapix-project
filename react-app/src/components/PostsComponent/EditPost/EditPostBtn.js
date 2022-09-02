import { useState } from "react";
import { Modal } from "../../../context/Modal";
// import { Modal } from "../../context/Modal";
import EditPostForm from "./EditPostForm";

function EditPostBtn() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        //   <Modal onClose={() => setShowModal(false)}>
        //     {/* Render delete post here? */}
        //   <EditPostForm />
        // </Modal>
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm />
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
