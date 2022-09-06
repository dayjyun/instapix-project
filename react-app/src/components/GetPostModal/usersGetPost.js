import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { PostModal } from "../../context/Modal";
import GetPost from "./GetPost";
import { getOneUser } from "../../store/users";
import "./index.css";
import "./GetPost.css";
import '../UserComponent/UserComponent.css'

function UserGetPostModal({ post }) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getOneUser(user?.id))
  })

  return (
    <>
      <div className='user-post-card' onClick={() => setShowModal(true)} >
        <img width='100%' height='100%' src={post?.post_url} className='user-img-card' />

        <div className='likes-comments-stats'>
          <p className='like-comment-p'>
            <i class="fa-solid fa-heart icon-styling"></i>
            {post.likes}
            <i class="fa-solid fa-comment icon-styling-2"></i>{post.num_comments}</p>
        </div>
      </div>

      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} />
        </PostModal>
      )}
    </>
  );
}

export default UserGetPostModal;
