import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            <div className='post-count'><p><span className='unbold'>{user.num_posts}</span> posts</p></div>
            <div className='post-count'><p><span className='unbold'>{user.num_followers}</span> followers</p></div>
          </div>

        </div>
      </div>
    </div>


  );
}
export default User;
