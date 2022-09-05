import { useDispatch } from "react-redux";
import { postFollowBackend } from "../../../store/follow";


const FollowButton = (user, follow) => {
    const dispatch = useDispatch()


    const handleClickFollow = async (e) => {
        e.preventDefault();

        const input = {
            user_id: user?.id,
            follows_id: parseInt(e.target.id)
        }
        await dispatch(postFollowBackend(input));
    }

    return (
        <div className='follower-follow-btn'>
            <button id={follow?.follower_info?.id} onClick={handleClickFollow}>Follow</button>
        </div>
    )
}

export default FollowButton;
