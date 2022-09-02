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
        <Modal onClose={() => setShowModal(false)}>
            //     {/* Render delete post here? */}
          <EditPostForm />
            {/* <button>Delete</button> */}
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
