import { useState } from "react";
import { useDispatch } from "react-redux";
import { EditModal } from "../../../context/Modal";
import { deletePost } from "../../../store/posts";
import EditPostForm from "./EditPostForm";
import "./PostMenu.css";
import { createBrowserHistory } from "history";

function PostMenu({ setShowMenuButtons, post }) {
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const [showEditPost, setShowEditPost] = useState(false);

  const handleDeletePostBtn = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(+post?.id));
    alert("Post successfully deleted");
    history.go(0)
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
    <div className="edit-post-modal">
      <div className="post-menu-buttons-container">
        <button className="pmb delete" onClick={handleDeletePostBtn}>
          Delete
        </button>
        <button className="pmb edit" onClick={() => setShowEditPost(true)}>
          Edit
        </button>

        {showEditPost && (
          <EditModal onClose={handleOnClose}>
            <EditPostForm
              post={post}
              setShowMenuButtons={setShowMenuButtons}
              setShowEditPost={setShowEditPost}
            />
          </EditModal>
        )}
        <button className="pmb cancel" onClick={handleCancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PostMenu;
