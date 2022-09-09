import { useEffect } from 'react';
import { getFollowersBackend } from '../../../store/follow';
import { useDispatch, useSelector } from "react-redux";
import FollowButton from './FollowButton';
import { useHistory } from 'react-router-dom';

import '../FollowModal.css'

const Following = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const follows = useSelector(state => state.follow.follows)

    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])


    return (
        <>
            <div className='following-modal-container'>
                <h3 className='following-header'>Following</h3>
                <div className='following-info-container'>
                    {follows && (
                        Object.values(follows)?.map((follow, index) => {
                            return (
                                <div className='each-follower-box' key={index}>
                                    <div className='follower-profile-image pointer' onClick={
                                        e => {
                                            e.preventDefault()
                                            history.push(`/users/${follow?.follower_info?.id}`)
                                            history.go()
                                        }}>
                                        <img src={follow?.follower_info?.profile_image} className='profile-img-circle-container' alt='preview' />
                                    </div>
                                    <div className='follower-user-info pointer' onClick={
                                        e => {
                                            e.preventDefault()
                                            history.push(`/users/${follow?.follower_info?.id}`)
                                            history.go()
                                        }}>
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

export default Following;
