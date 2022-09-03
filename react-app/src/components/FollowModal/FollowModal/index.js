import React, { useState } from 'react';
import { ModalSmall } from '../../../context/Modal';
import Following from './Following';
import '../../UserComponent/UserComponent.css'

function FollowModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} ><span className='bold'>{user.num_following}</span> following</p>

            {
                showModal && (
                    <ModalSmall onClose={() => setShowModal(false)}>
                        <Following />
                    </ModalSmall>
                )
            }
        </>
    );
}

export default FollowModal;
