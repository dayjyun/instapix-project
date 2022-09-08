import * as likeActions from '../../../../store/likes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TotalLikesComponent = ({ post }) => {
    const dispatch = useDispatch()
    const likes = Object.values(useSelector(state => state.likes))
    console.log(likes)

    useEffect(() => {
        dispatch(likeActions.fetchLike(post.id))
    }, [dispatch])

    return (
        <p>{likes?.length}</p>
    )
}

export default TotalLikesComponent
