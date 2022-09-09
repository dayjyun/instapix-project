import React, { useState } from 'react';
import { PostCardMenuModal } from '../../../context/Modal';
import PostCardButtons from './PostCardButtons';
import './PostCardButtons.css'

function PostCardModal({ post, randomPost }) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className='postcard-menu-button' onClick={() => setShowModal(true)}>...</button>
            {showModal && (
                <PostCardMenuModal onClose={() => setShowModal(false)}>
                    <PostCardButtons post={post} closeModal={closeModal} randomPost={randomPost} />
                </PostCardMenuModal>
            )}
        </>
    );
}

export default PostCardModal;
