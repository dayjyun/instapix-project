import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFollowersBackend } from '../../../store/follow';
import FollowButton from './FollowButton';
import '../FollowModal.css'

const Followers = ({ user }) => {
    const dispatch = useDispatch()

    const followers = useSelector(state => state.follow.followers)


    console.log(followers)

    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])

    return (
        <>
            <div className='following-modal-container'>
                <h3 className='following-header'>Followers</h3>
                <div className='following-info-container'>

                    {followers && (
                        Object.values(followers)?.map((follow, index) => {
                            return (
                                <div className='each-follower-box' key={index}>
                                    <div className='follower-profile-image'>
                                        <img src={follow?.follower_info?.profile_image} className='profile-img-circle-container' />
                                    </div>
                                    <div className='follower-user-info'>
                                        <p className='p-bolded'>{follow?.follower_info?.username}</p>
                                        <p className='p-styling'>{follow?.follower_info?.first_name}</p>
                                    </div>

                                    <FollowButton user={user} follow={follow} />

                                </div>
                            )
                        }))}
                </div>
            </div>
        </>
    )
}

export default Followers;
