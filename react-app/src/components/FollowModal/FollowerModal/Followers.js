import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFollowersBackend, postFollowBackend, getLoggedUserFollowingBackend, deleteFollowBackend } from '../../../store/follow';
import '../FollowModal.css'

const Followers = ({ user }) => {
    const dispatch = useDispatch()
    //GET LOGGED USER ID
    const loggedUser = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follow))
    let loggedUserFollows = follows.pop()
    loggedUserFollows = loggedUserFollows?.Followers


    const isFollowing = (follow) => {

        for (let i = 0; i < loggedUserFollows?.length; i++) {
            let loggedUserFollow = loggedUserFollows[i];

            if (follow?.follow?.user_id === loggedUserFollow?.follower_info?.id) {
                return (
                    <div className='follower-follow-btn'>
                        <button id={follow?.follower_info?.id} onClick={handleClickUnfollow}>Unfollow</button>
                    </div>
                )
            }
        }
        return (
            <div className='follower-follow-btn'>
                <button id={follow?.follower_info?.id} onClick={handleClickFollow}>Follow</button>
            </div>
        )
    }

    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])


    useEffect(() => {
        if (loggedUser) {
            dispatch(getLoggedUserFollowingBackend(loggedUser?.id))
        }
    }, [dispatch, loggedUser])


    const handleClickFollow = async (e) => {
        e.preventDefault();
        console.log('follow')
        const input = {
            user_id: user?.id,
            follows_id: parseInt(e.target.id)
        }
        await dispatch(postFollowBackend(input));
    }

    const handleClickUnfollow = async (e) => {
        e.preventDefault();
        console.log('unfollow')
        console.log(e.target)
        await dispatch(deleteFollowBackend(e.target.id));
        console.log('gets here?')
    }

    return (
        <>
            <div className='following-modal-container'>
                <h3 className='following-header'>Followers</h3>
                <div className='following-info-container'>
                    {follows && (
                        follows?.map((follow, index) => {
                            return (
                                <div className='each-follower-box' key={index}>
                                    <div className='follower-profile-image'>
                                        <img src={follow?.follower_info?.profile_image} className='profile-img-circle-container' />
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

export default Followers;
