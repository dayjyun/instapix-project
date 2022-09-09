import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Likes = ({ likes }) => {
    const users = useSelector(state => Object.values(state.users))
    const likedUserIds = likes?.map(like => like?.user_id)
    const usersThatLiked = users.filter(user => likedUserIds?.includes(user.id))

    const history = useHistory()

    return (
        <>
            <div className='likes-modal-container'>
                <h3 className='following-header'>Likes</h3>
                <div className='likes-info-container'>
                    {usersThatLiked && (
                        (usersThatLiked)?.map((user) => {
                            return (
                                <div className='each-follower-box' key={user?.id}>
                                    <div className='follower-profile-image'>
                                        <img
                                            src={user?.profile_image}
                                            className='profile-img-circle-container'
                                            onClick={() => history.push(`/users/${user?.id}`)}
                                            alt='previewImage'
                                        />
                                    </div>
                                    <div className='follower-user-info' onClick={() => history.push(`/users/${user?.id}`)}>
                                        <p className='p-bolded'>{user?.username}</p>
                                        <p className='p-styling'>{user?.first_name}</p>
                                    </div>

                                    {/* <FollowButton user={user} follow={follow} /> */}

                                </div>
                            )
                        }))}
                </div>
            </div>
        </>
    )
}

export default Likes
