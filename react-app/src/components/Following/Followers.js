import { useEffect } from 'react';
// import { useParams } from 'react-router-dom'
import { getFollowersBackend } from '../../store/follow';
import { useDispatch, useSelector } from "react-redux";


const Followers = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follow))

    useEffect(() => {
        if (user) {
            dispatch(getFollowersBackend(user?.id))
        }
    }, [dispatch, user])


    return (
        <>
            <h1>Followers</h1>
            {follows && (
                follows.map((follow, index) => {
                    return (
                        <div className='follower_box' key={index}>
                            <p>{follow.follower_info.username}</p>
                            <p>{follow.follower_info.first_name}</p>
                            <p>{follow.follower_info.profile_image}</p>
                        </div>
                    )
                }))}
        </>
    )
}

export default Followers;
