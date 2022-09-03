import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { deletePost } from "../../../store/posts";
import PostMenu from "./PostMenu";

function EditPostBtn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const [showMenuButtons, setShowMenuButtons] = useState(false);

  // const handleDeletePostBtn = (e) => {
  //   e.preventDefault();
  //   dispatch(deletePost(+postId));
  //   alert("Post successfully deleted");
  //   history.push("/posts/explorer");
  //   // ! redirect to current user profile
  // };
  // // ! Not deleting

  return (
    <>
      <button onClick={() => setShowMenuButtons(true)}>Menu Button...</button>
      {showMenuButtons && (
        <Modal onClose={() => setShowMenuButtons(false)}>
          {/* <button onClick={handleDeletePostBtn}>Delete</button> */}
          <PostMenu setShowMenuButtons={setShowMenuButtons}/>
        </Modal>
      )}
    </>
  );
}

export default EditPostBtn;
