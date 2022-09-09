import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFollowersBackend } from '../../../store/follow';
import FollowButton from './FollowButton';
import '../FollowModal.css'
import { useHistory } from 'react-router-dom';
// import User from '../../UserComponent';

const Followers = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const followers = useSelector(state => state.follow.followers)


    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])

    // const goToUserPage = (follow) => {
    //     history.push(`/users/${follow?.follower_info?.id}`)
    // }

    return (
        <>
            <div className='following-modal-container'>
                <h3 className='following-header'>Followers</h3>
                <div className='following-info-container'>

                    {followers && (
                        Object.values(followers)?.map((follow, index) => {
                            return (
                                <div className='each-follower-box' key={index}>
                                    <div className='follower-profile-image pointer' onClick={
                                        e => {
                                            e.preventDefault()
                                            history.push(`/users/${follow?.follower_info?.id}`)
                                            history.go()
                                        }
                                    } >

                                        <img src={follow?.follower_info?.profile_image} className='profile-img-circle-container' alt='previewImage' />
                                    </div>
                                    <div className='follower-user-info pointer' onClick={
                                        e => {
                                            e.preventDefault()
                                            history.push(`/users/${follow?.follower_info?.id}`)
                                            history.go()
                                        }
                                    }>
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
