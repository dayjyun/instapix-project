// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getPost } from "../../../store/posts";
// import './index.css'

// function ExplorePost({ post }) {
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getPost(+post?.id))
//     }, [dispatch, post])

//     return (
//         <li key={post?.id} className="explore-post-wrap">
//             <Link to={{ pathname: `/posts/${post.id}` }}>
//               <div
//                 className="explore-post-card"
//                 style={{ backgroundImage: "url(" + post?.post_url + ")" }}
//               >
//                 <div className="explore-post-text">
//                   <i className="fa-sharp fa-solid fa-heart"></i>
//                   <p className="ept-likes">{post?.likes}</p>
//                   <i className="fa-sharp fa-solid fa-comment"></i>
//                   <p className="ept-comments">{post?.num_comments}</p>
//                 </div>
//               </div>
//             </Link>
//           </li>
//     )
// }

// export default ExplorePost;
