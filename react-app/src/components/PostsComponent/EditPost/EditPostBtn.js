import { useState } from "react";
import { Modal } from "../../../context/Modal";
import PostMenu from "./PostMenu";

function EditPostBtn() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal == true ? setShowModal(false) : setShowModal(true)}>...</button>{" "}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostMenu />
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
