import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deletePost } from "../../../store/posts";
import EditPostForm from "./EditPostForm";
import "./PostMenu.css";

function PostMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user)
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);
  console.log(currentUser)

  const handleDeletePostBtn = (e) => {
    e.preventDefault();
    dispatch(deletePost(+postId));
    alert("Post successfully deleted");
    history.push(`/users/${currentUser.id}`);
  };
  // ! Not deleting

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="post-menu-buttons">
      <button onClick={handleDeletePostBtn}>Delete</button>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <button onClick={handleCancelBtn}>Cancel</button> */}
          <EditPostForm />
        </Modal>
      )}
      <button onClick={handleCancelBtn}>Cancel</button>
    </div>
  );
}

export default PostMenu;
