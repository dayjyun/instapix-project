import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { EditModal } from "../../../context/Modal";
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

  const handleDeletePostBtn = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(+postId));
    alert("Post successfully deleted");
    history.push(`/users/${currUser?.id}`);
  };

  const handleOnClose = () => {
    setShowEditPost(false);
    setShowMenuButtons(false);
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowMenuButtons(false);
  };

  return (
    <div className="post-menu-buttons-container">
      <button className="pmb delete" onClick={handleDeletePostBtn}>
        Delete
      </button>
      <button className="pmb edit" onClick={() => setShowEditPost(true)}>
        Edit
      </button>
      {showEditPost && (
          <Modal onClose={handleOnClose}>
            {/* <EditModal onClose={handleOnClose}> */}
            <EditPostForm
              setShowMenuButtons={setShowMenuButtons}
              setShowEditPost={setShowEditPost}
            />
            {/* </EditModal> */}
          </Modal>
      )}
      <button className="pmb cancel" onClick={handleCancelBtn}>
        Cancel
      </button>
    </div>
  );
}

export default PostMenu;
