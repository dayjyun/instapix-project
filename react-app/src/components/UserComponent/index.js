import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FollowModal from '../FollowModal/FollowModal';
import FollowerModal from '../FollowModal/FollowerModal';
import { getOneUser } from '../../store/users'
import { getFollowersBackend, getLoggedUserFollowingBackend, getFollowingBackend } from '../../store/follow'
import UserGetPostModal from '../GetPostModal/usersGetPost';
import './UserComponent.css'


function User() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  //GET LOGGED USER ID
  const loggedUser = useSelector(state => state.session.user)
  let user = Object.values(useSelector(state => state.users))
  user = user[0]
  const follows = useSelector(state => state.follow)


  console.log(user)

  useEffect(() => {
    dispatch(getOneUser(parseInt(userId)))
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(getLoggedUserFollowingBackend(loggedUser?.id))
  }, [dispatch, loggedUser])

  useEffect(() => {
    if (user) {
      dispatch(getFollowersBackend(user?.id))
      dispatch(getFollowingBackend(user?.id))
    }
  }, [dispatch, user])


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

                {follows?.followers && (
                  <div className='post-count pointer'>
                    <FollowerModal user={user} />
                  </div>
                )}

                {follows?.follows && (
                  <div className='post-count pointer'>
                    <FollowModal user={user} following={follows?.follows} />
                  </div>
                )}
              </div>

              <div className='user-name-bio' >
                <p className='username-styling'><span className='bold'>{user?.first_name}</span></p>
                <p className='username-styling'>{user?.bio}</p>
              </div>

            </div>
          </div>

          <hr className="solid"></hr>
          <div className='user-posts-collection'>
            {user?.posts?.map(post => {
              return (
                // <div className="explore-post-card">
                <UserGetPostModal post={post} />
                // </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default User;
