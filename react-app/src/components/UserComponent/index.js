import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FollowModal from '../FollowModal';
import './UserComponent.css'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='user-container-background'>
      <div className='user-information-container'>
        <div className='user-info-profile'>
          <img src={user.profile_image} className='user-profile-pic' />
        </div>

        <div className='user-info-info'>
          <h2 className='h2-style-username'>{user.username}</h2>

          <div className='user-stat-box'>
            <div className='post-count'><p><span className='bold'>{user.num_posts}</span> posts</p></div>

            <div className='post-count'>
              <FollowModal user={user} />
            </div>

            <div className='post-count'>
              <p><span className='bold'>{user.num_following}</span> followers</p></div>
          </div>

          <div className='user-name-bio'>
            <p><span className='bold'>{user.first_name}</span></p>
            <p>{user.bio}</p>
          </div>

        </div>
      </div>
    </div>


  );
}
export default User;
