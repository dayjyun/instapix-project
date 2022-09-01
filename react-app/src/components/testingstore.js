import * as hashtagActions from '../store/hashtags'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as likeActions from '../store/likes'

const TestingComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const hashtags = Object.values(useSelector(state => state.hashtags))
    const likes = Object.values(useSelector(state => state.likes))
    console.log("THIs >>>>>>>", hashtags)

    useEffect(() => {
        dispatch(hashtagActions.fetchAllHashtags())
        dispatch(likeActions.fetchLike(1))
    }, [dispatch])

    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(likeActions.like(1))
    }

    return (
        <div>
            <div>
                {hashtags?.map((hashtag) => (
                    <li key={hashtag?.id}>
                        <div>
                            hashtagid: {hashtag.id}
                        </div>
                        <div>
                            hashtag_value: {hashtag.hashtag_value}
                        </div>
                    </li>
                ))}
            </div>
            <div>
                {likes.map(like => (
                    <div key={like.id}>
                        <li>{like.post_id}</li>
                        <li>{like.user_id}</li>
                    </div>
                ))}
            </div>
            <button onClick={handleOnClick}>LIKE</button>
        </div>
    )
}

export default TestingComponent
