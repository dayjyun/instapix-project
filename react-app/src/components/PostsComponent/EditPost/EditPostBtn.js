import { useState } from "react";
import { Modal } from "../../../context/Modal";
import PostMenu from "./PostMenu";
import './EditPostBtn.css'

function EditPostBtn({ post }) {
  const [showMenuButtons, setShowMenuButtons] = useState(false);

  return (
    <>
      <button className="edit-post-menu-button" onClick={() => setShowMenuButtons(true)}>...</button>
      {showMenuButtons && (
        <Modal onClose={() => setShowMenuButtons(false)}>
          <PostMenu post={post} setShowMenuButtons={setShowMenuButtons} />
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
