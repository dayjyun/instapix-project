import React, { useState } from 'react';
import { ModalSmall } from '../../../context/Modal';
import Followers from './Followers';
import '../../UserComponent/UserComponent.css'

function FollowerModal({ user, followers }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <p onClick={() => setShowModal(true)} ><span className='bold'>{Object.values(followers).length}</span> followers</p>
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
