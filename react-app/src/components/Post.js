import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../store/posts";

function PostComponent() {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const posts = Object.values(useSelector(state => state.posts));
    const comments = posts[0]?.Post[0]?.Comments;

    useEffect(() => {
        dispatch[getPost(songId)]
    }, [dispatch])

    return (
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div>{posts[0]?.Post[0].caption}</div>
            </li>
          ))}
        </ul>
        <ul>
          {comments?.map((comment) => (
            <li key={comment.id}>{comment?.body}</li>
          ))}
        </ul>
      </div>
    );
}

export default PostComponent
