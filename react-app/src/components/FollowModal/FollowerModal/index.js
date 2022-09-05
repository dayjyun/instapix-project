import React, { useState, useEffect } from 'react';
import { ModalSmall } from '../../../context/Modal';
import Followers from './Followers';
import '../../UserComponent/UserComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../../store/users'
import { getFollowers } from '../../../store/follow'

function FollowerModal({ userId }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const followers = useSelector(state => state.follow.followers)

    let user = Object.values(useSelector(state => state.users))
    user = user[0]

    useEffect(() => {
        dispatch(getOneUser(parseInt(userId)))
    }, [dispatch, userId])

    return (
        <>
            <p onClick={() => setShowModal(true)} ><span className='bold'>{user?.num_followers}</span> followers</p>

            {
                showModal && (
                    <ModalSmall onClose={() => setShowModal(false)}>
                        <Followers user={user} />
                    </ModalSmall>
                )
            }
        </>
    );
}

export default FollowerModal;
