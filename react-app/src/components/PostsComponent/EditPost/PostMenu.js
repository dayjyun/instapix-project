import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deletePost } from "../../../store/posts";
import EditPostForm from "./EditPostForm";
import "./PostMenu.css";

function PostMenu({ setShowMenuButtons }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);
  const { postId } = useParams();
  const [showEditPost, setShowEditPost] = useState(false);
  console.log(currUser);

  const handleDeletePostBtn = (e) => {
    e.preventDefault();
    dispatch(deletePost(+postId));
    alert("Post successfully deleted");
    history.push(`/users/${currUser.id}`);
  };
  // ! Not deleting

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowMenuButtons(false);
  };

  return (
    <div className="post-menu-buttons">
      <button onClick={handleDeletePostBtn}>Delete</button>
      <button onClick={() => setShowEditPost(true)}>Edit</button>
      {showEditPost && (
        <Modal onClose={() => setShowEditPost(false)}>
          <EditPostForm setShowEditPost={setShowEditPost} />
        </Modal>
      )}
      <button onClick={handleCancelBtn}>Cancel</button>
    </div>
  );
}

export default PostMenu;
