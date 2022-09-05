import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFollowersBackend, postFollowBackend, getLoggedUserFollowingBackend, deleteFollowBackend } from '../../../store/follow';
import '../FollowModal.css'

const Followers = ({ user, followers }) => {
    const dispatch = useDispatch()
    //GET LOGGED USER ID
    const loggedUser = useSelector(state => state.session.user)
    const loggedUserFollows = useSelector(state => state?.follow?.loggedUser?.Followers)

    console.log(loggedUserFollows)

    const followers2 = useSelector(state => state.follow.followers)

    console.log(followers2)

    const [followBtn, setFollowBtn] = useState()

    const isFollowing = (follow) => {

        if (loggedUserFollows) {
            for (let i = 0; i < loggedUserFollows?.length; i++) {
                let loggedUserFollow = loggedUserFollows[i];


                console.log(follow?.follower_info?.id)
                console.log(loggedUserFollow)
                console.log(loggedUserFollow?.follower_info?.id)

                if (follow?.follower_info?.id === loggedUserFollow?.follower_info?.id) {
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
    }

    useEffect(() => {
        if (loggedUser) {
            dispatch(getLoggedUserFollowingBackend(loggedUser?.id))
        }
    }, [dispatch, loggedUser])


    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])


    const handleClickFollow = async (e) => {
        e.preventDefault();

        const input = {
            user_id: user?.id,
            follows_id: parseInt(e.target.id)
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
                <h3 className='following-header'>Followers</h3>
                <div className='following-info-container'>

                    {followers2 && (
                        Object.values(followers2)?.map((follow, index) => {
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

                                    {/*
if the follow state is true,  && the logged user is not following then render a follow button

after clicked, the opposite button must appear

follow state should update
 */}
                                </div>
                            )
                        }))}
                </div>
            </div>
        </>
    )
}

export default Followers;
