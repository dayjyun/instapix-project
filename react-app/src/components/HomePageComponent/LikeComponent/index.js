import * as likeActions from "../../../store/likes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../../store/posts";

const LikeComponent = ({ post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const likesUserIds = post?.real_likes?.map((like) => like?.user_id);
  const liked = likesUserIds?.includes(sessionUser?.id);

  useEffect(() => {
    if (post) {
      dispatch(likeActions.fetchLike(post.id));
      dispatch(getPost(post.id));
    }
  }, [dispatch]);

  const likePost = async () => {
    if (liked) {
      await dispatch(likeActions.unlike(post.id));
      await dispatch(getPost(post.id));
    } else {
      await dispatch(likeActions.like(post.id));
      await dispatch(getPost(post.id));
    }
  };

  let postLiked = (
    <i className="fa-regular fa-solid fa-heart heart-likes-solid"></i>
  );
  let postNotLiked = <i className="fa-regular fa-heart heart-likes-hollow"></i>;

  return (
    <div onClick={async () => likePost()}>
      {liked ? postLiked : postNotLiked}
    </div>
  );
};

export default LikeComponent;
