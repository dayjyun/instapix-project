import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getFollowingBackend } from '../../store/follow';
import { useDispatch, useSelector } from "react-redux";


const Following = () => {
    const dispatch = useDispatch()
    const userId = useParams()
    userId = parseInt(userId)

    const user = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.following))

    useEffect(() => {
        dispatch(getFollowingBackend(user?.id))
    }, [dispatch, user])


    return (
        <>
            <h1>Following</h1>




        </>
    )
}

export default Following;
