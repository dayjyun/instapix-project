import { useDispatch, useSelector } from "react-redux";
import { postFollowBackend, deleteFollowBackend, getLoggedUserFollowingBackend } from "../../../store/follow";
import { useState, useEffect } from 'react';
import "../FollowModal.css"

const FollowButton = ({ user, follow }) => {
    const dispatch = useDispatch()

    const [followButton, setFollowButton] = useState()

    const loggedUser = useSelector(state => state.session.user)
    const loggedUserFollows = Object.values(useSelector(state => state?.follow?.loggedUser))


    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend(loggedUser?.id))
    }, [loggedUser, dispatch])


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
        await dispatch(postFollowBackend(input, user?.id));
    }


    const handleClickUnfollow = async (e) => {
        e.preventDefault();
        await dispatch(deleteFollowBackend(e.target.id, loggedUser?.id));
    }

    return (
        <>
            {followButton && (
                <>
                    <div className='follower-follow-btn'>
                        <button className='follow-button-styling' id={follow?.follower_info?.id} onClick={handleClickFollow}>Follow</button>
                    </div>
                </>
            )}
            {!followButton && (
                <div className='follower-follow-btn'>
                    <button className='follow-button-styling' id={follow?.follower_info?.id} onClick={handleClickUnfollow}>Unfollow</button>
                </div>
            )}
        </>
    )
}

export default FollowButton;
