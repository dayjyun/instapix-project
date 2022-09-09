import { useState } from "react";
import { useDispatch } from "react-redux";
import { EditCommentModal } from "../../../context/Modal";
import { removeComment } from "../../../store/comments";
import EditCommentForm from "./EditCommentForm";

function EditComment({ setShowMenuButtons, comment }) {
  const dispatch = useDispatch();
  const [showEditComment, setShowEditComment] = useState(false);

  const handleDeleteCommentBtn = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment?.id));
  };

  const handleOnClose = () => {
    setShowEditComment(false);
    setShowMenuButtons(false);
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowEditComment(false);
    setShowMenuButtons(false);

  };

  return (
    <div className="post-menu-buttons-container">
      <button className="pmb delete" onClick={handleDeleteCommentBtn}>
        Delete
      </button>
      <button className="pmb edit" onClick={() => setShowEditComment(true)}>
        Edit
      </button>
      {showEditComment && (
          <EditCommentModal onClose={handleOnClose}>
            {/* <EditModal onClose={handleOnClose}> */}
            <EditCommentForm
              setShowMenuButtons={setShowMenuButtons}
              setShowEditComment={setShowEditComment}
              comment={comment}
            />
            {/* </EditModal> */}
          </EditCommentModal>
      )}
      <button className="pmb cancel" onClick={handleCancelBtn}>
        Cancel
      </button>
    </div>
  );
}

export default EditComment;
