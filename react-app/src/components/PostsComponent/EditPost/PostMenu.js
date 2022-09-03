import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deletePost } from "../../../store/posts";
import EditPostForm from "./EditPostForm";
import "./PostMenu.css";

function PostMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handleDeletePostBtn = (e) => {
    e.preventDefault();
    dispatch(deletePost(+postId));
    alert("Post successfully deleted");
    history.push("/posts/explorer"); // ! redirect to current user profile
  };
  // ! Not deleting

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="post-menu-buttons">
      <div>
        <button onClick={handleDeletePostBtn}>Delete</button>
      </div>
      <div>
        <button onClick={() => setShowModal(true)}>Edit</button>
      </div>
      <div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {/* <button onClick={handleCancelBtn}>Cancel</button> */}
            <EditPostForm />
          </Modal>
        )}
      </div>
      <div>
        <button onClick={handleCancelBtn}>Cancel</button>
      </div>
    </div>
  );
}

export default PostMenu;
