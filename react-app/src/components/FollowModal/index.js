import React, { useState } from 'react';
import { ModalSmall } from '../../context/Modal';
import Following from './Following';
// import './.css
import '../UserComponent/UserComponent.css'

function FollowModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>

            <p onClick={() => setShowModal(true)} ><span className='bold'>{user.num_followers}</span> followers</p>
            {
                showModal && (
                    <ModalSmall onClose={() => setShowModal(false)}>
                        <Following />
                    </ModalSmall>
                )
            }
        </>
    );
}

export default FollowModal;
