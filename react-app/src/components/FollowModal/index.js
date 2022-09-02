import React, { useState } from 'react';
import { ModalSmall } from '../../context/Modal';
import Following from './Following';
// import './.css

function FollowingModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} >Following</button>
            {showModal && (
                <ModalSmall onClose={() => setShowModal(false)}>
                    <Following />
                </ModalSmall>
            )}
        </>
    );
}

export default FollowingModal;
