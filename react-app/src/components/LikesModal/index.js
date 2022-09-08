import React, { useState } from 'react';
import { ModalSmall } from '../../context/Modal';
import Likes from './Likes';

function LikesModal({ likes }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)} >{likes?.length} Likes</div>
            {
                showModal && (
                    <ModalSmall onClose={() => setShowModal(false)}>
                        <Likes likes={likes}/>
                    </ModalSmall>
                )
            }
        </>
    );
}

export default LikesModal;
