import React, { useState } from "react";
import { ModalSmall } from "../../../context/Modal";
import EditComment from "./EditComment";
import './EditComment.css'

function EditCommentModal({comment}) {
  const [showModal, setShowModal] = useState(false);
  const [showMenuButtons, setShowMenuButtons] = useState(false);


  return (
    <>
      <button className="edit-comment-modal" onClick={() => setShowModal(true)}>...</button>
      {showModal && (
        <ModalSmall onClose={() => setShowMenuButtons(false)}>
          <EditComment setShowMenuButtons={setShowMenuButtons} comment={comment}/>
        </ModalSmall>
      )}
    </>
  );
}

export default EditCommentModal;
