import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { EditCommentModal } from "../../../context/Modal";
import { removeComment } from "../../../store/comments";
import { deletePost } from "../../../store/posts";
import EditCommentForm from "./EditCommentForm";

function EditComment({ setShowMenuButtons, comment }) {
  const dispatch = useDispatch();
//   const history = useHistory();
//   const currUser = useSelector((state) => state.session.user);
  const [showEditComment, setShowEditComment] = useState(false);

  const handleDeleteCommentBtn = async (e) => {
    e.preventDefault();
    await dispatch(removeComment(comment?.id));
    // alert("Comment successfully deleted");
    // history.push(`/users/${currUser?.id}`);
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
