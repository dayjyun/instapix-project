import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getFollowingBackend } from '../../store/follow';
import { useDispatch, useSelector } from "react-redux";


const Following = () => {
    const dispatch = useDispatch()
    let userId = useParams()
    userId = parseInt(userId)

    const user = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follow))

    console.log(follows)

    useEffect(() => {
        dispatch(getFollowingBackend(user?.id))
    }, [dispatch, user])


    return (
        <>
            <h1>Following</h1>
            {follows && (
                follows.map((follow, index) => {
                    return (
                        <div className='test' key={index}>
                            <p>{follow.follower_info.username}</p>
                            <p>{follow.follower_info.first_name}</p>
                        </div>
                    )
                }))}
        </>
    )
}

export default Following;
