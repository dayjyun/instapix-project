import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFollowersBackend, postFollowBackend } from '../../../store/follow';

import '../FollowModal.css'

const Followers = () => {
    const dispatch = useDispatch()
    // Add a follow button or 'already follows' p tag later
    // const [doesFollow, setDoesFollow] = useState();

    const user = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follow))

    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])

    const handleClick = async (e) => {
        e.preventDefault();

        const input = {
            user_id: user?.id,
            follows_id: e.target.id
        }

        await dispatch(postFollowBackend(input));
    }

    // useEffect(() => {
    //     if (user?.)
    // })

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


                                    <div className='follower-follow-btn'>
                                        <p>You Follow</p>
                                    </div>

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
