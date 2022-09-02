import { useEffect } from 'react';
// import { useParams } from 'react-router-dom'
import { getFollowingBackend, deleteFollowBackend } from '../../store/follow';
import { useDispatch, useSelector } from "react-redux";
import './FollowModal.css'

const Following = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follow))
    // console.log(follows)

    useEffect(() => {
        if (user) {
            dispatch(getFollowingBackend(user?.id))
        }
    }, [dispatch, user])

    const handleClick = async (e) => {
        e.preventDefault();

        await dispatch(deleteFollowBackend(e.target.id));
    }

    return (
        <>
            <h3 className='following-header'>Following</h3>
            <div className='following-modal-container'>
                {follows && (
                    follows?.map((follow, index) => {
                        return (
                            <div className='each-follower-box' key={index}>
                                <div className='follower-profile-image'>
                                    <img src={follow?.follower_info?.profile_image} />
                                </div>
                                <div className='follower-user-info'>
                                    <p className='p-bolded'>{follow?.follower_info?.username}</p>
                                    <p className='p-no-padding'>{follow?.follower_info?.first_name}</p>
                                </div>


                                <div className='follower-follow-btn'>
                                    <button id={follow?.follow?.follows_id} onClick={handleClick}>Unfollow</button>
                                </div>
                            </div>
                        )
                    }))}
            </div>
        </>
    )
}

export default Following;
