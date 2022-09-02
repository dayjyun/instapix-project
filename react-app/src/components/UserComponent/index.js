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
      </div>
      {/* <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul> */}
    </div>
  );
}
export default User;
