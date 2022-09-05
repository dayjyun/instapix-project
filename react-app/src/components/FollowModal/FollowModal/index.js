import React, { useState } from 'react';
import { ModalSmall } from '../../../context/Modal';
import Following from './Following';
import '../../UserComponent/UserComponent.css'

function FollowModal({ user, following }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} ><span className='bold'>{Object.values(following)?.length}</span> following</p>
            {
                showModal && (
                    <ModalSmall onClose={() => setShowModal(false)}>
                        <Following user={user} following={following} />
                    </ModalSmall>
                )
            }
        </>
    );
}

export default FollowModal;
