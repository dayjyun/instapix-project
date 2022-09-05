import { useDispatch, useSelector } from "react-redux";
import { postFollowBackend, deleteFollowBackend, getLoggedUserFollowingBackend } from "../../../store/follow";
import { useState, useEffect } from 'react';


const FollowButton = ({ user, follow }) => {
    const dispatch = useDispatch()
    const [followButton, setFollowButton] = useState()

    const loggedUserFollows = Object.values(useSelector(state => state?.follow?.loggedUser))

    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend(user?.id))
    }, [user, dispatch])

    useEffect(() => {
        let yes;
        if (follow && loggedUserFollows) {
            for (let i = 0; i < loggedUserFollows?.length; i++) {
                let loggedUserFollow = loggedUserFollows[i];

                if (follow?.follower_info?.id === loggedUserFollow?.follower_info?.id) {
                    setFollowButton(false)
                    yes = true
                    return;
                }
            }
        }
        if (!yes) {
            setFollowButton(true)
        }
    }, [loggedUserFollows, follow, followButton])


    const handleClickFollow = async (e) => {
        e.preventDefault();
        const input = {
            user_id: user?.id,
            follows_id: parseInt(follow?.follower_info?.id)
        }
        await dispatch(postFollowBackend(input));
    }


    const handleClickUnfollow = async (e) => {
        e.preventDefault();
        await dispatch(deleteFollowBackend(e.target.id));
    }

    return (
        <>
            {followButton && (
                <>
                    <div className='follower-follow-btn'>
                        <button id={follow?.follower_info?.id} onClick={handleClickFollow}>Follow!</button>
                    </div>
                </>
            )}
            {!followButton && (
                <div className='follower-follow-btn'>
                    <button id={follow?.follower_info?.id} onClick={handleClickUnfollow}>Unfollow!</button>
                </div>
            )}
        </>
    )
}

export default FollowButton;
