import { useEffect } from 'react';
// import { useParams } from 'react-router-dom'
import { getFollowingBackend, deleteFollowBackend } from '../../store/follow';
import { useDispatch, useSelector } from "react-redux";


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
            <h3>Following</h3>
            {follows && (
                follows?.map((follow, index) => {
                    return (
                        <div className='follower_box' key={index}>
                            <p>{follow?.follower_info?.username}</p>
                            <p>{follow?.follower_info?.first_name}</p>
                            <p>{follow?.follower_info?.profile_image}</p>
                            <p>{follow?.follow?.follows_id}</p>

                            <button id={follow?.follow?.follows_id} onClick={handleClick}>Unfollow</button>
                        </div>
                    )
                }))}
        </>
    )
}

export default Following;
