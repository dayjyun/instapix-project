import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostForm from './PostForm';
import './PostForm.css'

function PostFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='fa-regular fa-square-plus'></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostForm />
                </Modal>
            )}
        </>
    );
}

export default PostFormModal;
