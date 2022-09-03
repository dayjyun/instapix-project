import { useState } from "react";
import { Modal } from "../../../context/Modal";
import PostMenu from "./PostMenu";

function EditPostBtn() {
  const [showMenuButtons, setShowMenuButtons] = useState(false);

  const closeModal = () => {
    setShowMenuButtons(false)
  }

  return (
    <>
      <button onClick={() => setShowMenuButtons(true)}>Menu Button...</button>
      {showMenuButtons && (
        <Modal onClose={() => setShowMenuButtons(false)}>
          <PostMenu setShowMenuButtons={setShowMenuButtons}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
