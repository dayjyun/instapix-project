import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostForm from './PostForm';
import './PostForm.css'

function PostFormModal() {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)} className='fa-regular fa-square-plus'></button>
            {showModal && (
                <Modal  className='post-modal' onClose={() => setShowModal(false)}>
                    <PostForm closeModal={closeModal} />
                </Modal>
            )}
        </>
    );
}

export default PostFormModal;
