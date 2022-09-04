import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFollowersBackend, postFollowBackend, getLoggedUserFollowingBackend } from '../../../store/follow';
import '../FollowModal.css'

const Followers = ({ user }) => {
    const dispatch = useDispatch()
    //GET LOGGED USER ID
    const loggedUser = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follow))
    let loggedUserFollows = follows.pop()
    loggedUserFollows = loggedUserFollows?.Followers
    // loggedUserFollows = Object.values(loggedUserFollows)
    // Add a follow button or 'already follows' p tag later
    const [isMyPage, setIsMyPage] = useState(false);
    const [iFollow, setIFollow] = useState()


    const isFollowing = (follow) => {

        for (let i = 0; i < loggedUserFollows?.length; i++) {
            let loggedUserFollow = loggedUserFollows[i];
            // console.log(follow)
            // console.log(loggedUserFollow?.follow?.follows_id)
            if (follow.follow.user_id === loggedUserFollow?.follow?.follows_id) {
                return (
                    <div className='follower-follow-btn'>
                        <button id={follow?.follow?.follows_id} onClick={handleClick}>Follow</button>
                    </div>
                )
            }
        }
        loggedUserFollows?.forEach(loggedUserFollow => {

        })

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

    const handleClick = async (e) => {
        e.preventDefault();

        const input = {
            user_id: user?.id,
            follows_id: e.target.id
        }
        await dispatch(postFollowBackend(input));
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



                                    {/* {isMyPage && (
                                        <div className='follower-follow-btn'>
                                            <p>You Follow</p>
                                        </div>
                                    )} */}

                                    {/* <div className='follower-follow-btn'>
                                        <button id={follow?.follow?.follows_id} onClick={handleClick}>Follow</button>
                                    </div> */}

                                </div>
                            )
                        }))}
                </div>
            </div>
        </>
    )
}

export default Followers;
