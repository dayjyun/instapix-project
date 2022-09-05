import React, { useState } from 'react';
import { PostCardMenuModal } from '../../../context/Modal';
import PostCardButtons from './PostCardButtons';
import './PostCardButtons.css'

function PostCardModal({ follower }) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>...</button>
            {showModal && (
                <PostCardMenuModal onClose={() => setShowModal(false)}>
                    <PostCardButtons follower={follower} closeModal={closeModal} />
                </PostCardMenuModal>
            )}
        </>
    );
}

export default PostCardModal;
