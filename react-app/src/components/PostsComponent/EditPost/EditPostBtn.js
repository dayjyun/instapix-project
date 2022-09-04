import { useState } from "react";
import { Modal } from "../../../context/Modal";
import PostMenu from "./PostMenu";
import './EditPostBtn.css'

function EditPostBtn() {
  const [showMenuButtons, setShowMenuButtons] = useState(false);

  return (
    <>
      <button className="edit-post-button" onClick={() => setShowMenuButtons(true)}>...</button>
      {showMenuButtons && (
        <Modal onClose={() => setShowMenuButtons(false)}>
          <PostMenu setShowMenuButtons={setShowMenuButtons}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
