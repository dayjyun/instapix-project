import { useEffect } from 'react';
import { getFollowingBackend, postFollowBackend, getLoggedUserFollowingBackend, deleteFollowBackend } from '../../../store/follow';
import { useDispatch, useSelector } from "react-redux";
import '../FollowModal.css'

const Following = ({ user }) => {
    const dispatch = useDispatch()
    //GET LOGGED USER ID
    const loggedUser = useSelector(state => state.session.user)
    const allFollows = useSelector(state => state.follow)
    let loggedUserFollows;
    let follows = allFollows?.follows

    if (allFollows) {
        loggedUserFollows = allFollows?.loggedUser?.Followers
    }


    const isFollowing = (follow) => {
        for (let i = 0; i < loggedUserFollows?.length; i++) {
            let loggedUserFollow = loggedUserFollows[i];

            if (follow?.follow?.follows_id === loggedUserFollow?.follower_info?.id) {
                return (
                    <div className='follower-follow-btn'>
                        <button id={follow?.follow?.follows_id} onClick={handleClickUnfollow}>Unfollow</button>
                    </div>
                )
            }
        }
        return (
            <div className='follower-follow-btn'>
                <button id={follow?.follow?.follows_id} onClick={handleClickFollow}>Follow</button>
            </div>
        )
    }

    useEffect(() => {
        if (loggedUser) {
            dispatch(getLoggedUserFollowingBackend(loggedUser?.id))
        }
    }, [dispatch, loggedUser])



    useEffect(() => {
        if (user) {
            dispatch(getFollowingBackend(user?.id))
        }
    }, [dispatch, user])


    const handleClickFollow = async (e) => {
        e.preventDefault();

        const input = {
            user_id: user?.id,
            follows_id: e.target.id
        }
        await dispatch(postFollowBackend(input));
    }

    const handleClickUnfollow = async (e) => {
        e.preventDefault();
        await dispatch(deleteFollowBackend(e.target.id));
    }

    return (
        <>
            <div className='following-modal-container'>
                <h3 className='following-header'>Following</h3>
                <div className='following-info-container'>
                    {follows && (
                        Object.values(follows)?.map((follow, index) => {
                            return (
                                <div className='each-follower-box' key={index}>
                                    <div className='follower-profile-image'>
                                        <img src={follow?.follower_info?.profile_image} className='profile-img-circle-container' alt='preview' />
                                    </div>
                                    <div className='follower-user-info'>
                                        <p className='p-bolded'>{follow?.follower_info?.username}</p>
                                        <p className='p-styling'>{follow?.follower_info?.first_name}</p>
                                    </div>

                                    {isFollowing(follow)}

                                </div>
                            )
                        }))}
                </div>
            </div>
        </>
    )
}

export default Following;
