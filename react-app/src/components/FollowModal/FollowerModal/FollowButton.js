import { useDispatch } from "react-redux";
import { postFollowBackend, deleteFollowBackend } from "../../../store/follow";
import { useState, useEffect } from 'react';


const FollowButton = ({ user, follow, loggedUserFollows }) => {
    const dispatch = useDispatch()
    const [followButton, setFollowButton] = useState()

    console.log(follow)
    console.log(loggedUserFollows)

    useEffect(() => {
        let yes;
        if (follow && loggedUserFollows) {
            for (let i = 0; i < loggedUserFollows?.length; i++) {
                let loggedUserFollow = loggedUserFollows[i];

                console.log(follow?.follower_info?.id, loggedUserFollow?.follower_info?.id)

                if (follow?.follower_info?.id === loggedUserFollow?.follower_info?.id) {
                    setFollowButton(false)
                    yes = true
                    return
                }
            }
            console.log(followButton)
            // setFollowButton(true)
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
                        <button id={follow?.follower_info?.id} onClick={handleClickFollow}>Follow</button>
                    </div>
                </>
            )}
            {!followButton && (
                <div className='follower-follow-btn'>
                    <button id={follow?.follower_info?.id} onClick={handleClickUnfollow}>Unfollow</button>
                </div>
            )}
        </>
    )
}

export default FollowButton;
