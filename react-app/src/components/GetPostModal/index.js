import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import GetPost from './GetPost';
import './GetPost.css'

function GetPostModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='fa-regular fa-square-plus'>GETPOSTTEST</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <GetPost />
                </Modal>
            )}
        </>
    );
}

export default GetPostModal;
