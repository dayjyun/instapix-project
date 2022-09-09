// import React, { useState } from "react";
// import { PostModal } from "../../context/Modal";
// import GetPost from "./GetPost";
// import "./index.css";
// import "./GetPost.css";
// import '../UserComponent/UserComponent.css'


// function UserGetPostModal({ post, i }) {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div key={i}>
//       <div className='user-post-card' onClick={() => setShowModal(true)} >
//         <img width='100%' height='100%' src={post?.post_url} className='user-img-card' alt='previewImage' />

//         <div className='likes-comments-stats'>
//           <p className='like-comment-p'>
//             <i className="fa-solid fa-heart icon-styling"></i>
//             {post.likes}
//             <i className="fa-solid fa-comment icon-styling-2"></i>{post.num_comments}</p>
//         </div>
//       </div>

//       {showModal && (
//         <PostModal onClose={() => setShowModal(false)}>
//           <GetPost post={post} />
//         </PostModal>
//       )}
//     </div>
//   );
// }

// export default UserGetPostModal;

import React, { useState } from "react";
import { PostModal } from "../../context/Modal";
import GetPost from "./GetPost";
import "./index.css";
import "./GetPost.css";
import '../UserComponent/UserComponent.css'


function UserGetPostModal({ post, user }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div className='user-post-card' onClick={() => setShowModal(true)} >
        <img
          width='100%'
          height='100%'
          src={post?.post_url}
          className='user-img-card'
          alt='previewImage'
        />
        <div className='likes-comments-stats'>
          <p className='like-comment-p'>
            <i className="fa-solid fa-heart icon-styling"></i>
            {post?.likes}
            <i className="fa-solid fa-comment icon-styling-2"></i>{post?.num_comments}</p>
        </div>
      </div>

      {showModal && (
        <PostModal onClose={() => setShowModal(false)}>
          <GetPost post={post} user={user} />
        </PostModal>
      )}
    </>
  );
}

export default UserGetPostModal;
