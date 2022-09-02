import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Following from './Following';
// import './.css

function FollowingModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} >Following</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Following />
                </Modal>
            )}
        </>
    );
}

export default FollowingModal;
