import React, { useState } from 'react';
import { ModalSmall } from '../../../context/Modal';
import Followers from './Followers';
import '../../UserComponent/UserComponent.css'

function FollowerModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} ><span className='bold'>{user.num_followers}</span> followers</p>

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
