import React, { useState } from 'react';
import { PostCardMenuModal } from '../../../context/Modal';
import PostCardButtons from './PostCardButtons';
import './PostCardButtons.css'

function PostCardModal({ follower, randomPost }) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className='postcard-menu-button' onClick={() => setShowModal(true)}>...</button>
            {showModal && (
                <PostCardMenuModal onClose={() => setShowModal(false)}>
                    <PostCardButtons follower={follower} closeModal={closeModal} randomPost={randomPost} />
                </PostCardMenuModal>
            )}
        </>
    );
}

export default PostCardModal;
