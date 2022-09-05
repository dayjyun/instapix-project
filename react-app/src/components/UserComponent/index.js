import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FollowModal from '../FollowModal/FollowModal';
import FollowerModal from '../FollowModal/FollowerModal';
import './UserComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../store/users'

function User() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  let user = Object.values(useSelector(state => state.users))
  user = user[0]

  useEffect(() => {
    dispatch(getOneUser(parseInt(userId)))
  }, [dispatch, userId])


  return (
    <>
      {user && (
        <div className='user-container-background'>
          <div className='user-information-container'>
            <div className='user-info-profile'>
              <img src={user?.profile_image} className='user-profile-pic' />
            </div>

            <div className='user-info-info'>
              <h2 className='h2-style-username'>{user?.username}</h2>

              <div className='user-stat-box'>
                <div className='post-count'><p><span className='bold'>{user?.num_posts}</span> posts</p></div>

                <div className='post-count pointer'>
                  <FollowerModal userId={userId} />
                </div>

                <div className='post-count pointer'>
                  <FollowModal user={user} />
                </div>
              </div>


              <div className='user-name-bio' >
                <p><span className='bold'>{user?.first_name}</span></p>
                <p>{user?.bio}</p>
              </div>

            </div>
          </div>

          <hr className="solid"></hr>

          <div className='user-posts-collection'>
            {user?.posts?.map(post => {
              return (
                <div className='user-post-card'>
                  <img src={post?.post_url} className='user-img-card' />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>


  );
}
export default User;
