import React, { useState } from 'react';
import { PostModal } from '../../context/Modal';
import GetPost from './GetPost';
import './GetPost.css'

function GetPostModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='fa-regular fa-square-plus'>GETPOSTTEST</button>
            {showModal && (
                <PostModal onClose={() => setShowModal(false)}>
                    <GetPost />
                </PostModal>
            )}
        </>
    );
}

export default GetPostModal;
