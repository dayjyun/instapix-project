import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FollowModal from '../FollowModal/FollowModal';
import FollowerModal from '../FollowModal/FollowerModal';
import { getOneUser } from '../../store/users'
import { getFollowersBackend, getLoggedUserFollowingBackend, getFollowingBackend, postFollowBackend, deleteFollowBackend } from '../../store/follow'
import UserGetPostModal from '../GetPostModal/usersGetPost';
import './UserComponent.css'
import { loadAllPosts } from '../../store/posts';


function User() {
  const { userId } = useParams();
  const dispatch = useDispatch()
  //GET LOGGED USER ID
  const loggedUser = useSelector(state => state.session.user)
  let user = Object.values(useSelector(state => state.users))
  user = user[0]
  const follows = useSelector(state => state?.follow)
  const posts = useSelector(state => Object.values(state.posts))
  const usersPosts = posts.filter(post => post?.user_id === user?.id)

  const [onMyPage, setOnMyPage] = useState('');
  const [alreadyFollowing, setAlreadyFollowing] = useState(false)



  useEffect(() => {
    if (follows.loggedUser) {
      Object.values(follows.loggedUser).forEach((follow) => {
        if (follow?.follower_info?.id === user?.id) {
          setAlreadyFollowing(true)
        }
      })
    }
  }, [user, follows])


  useEffect(() => {
    if (user?.id === loggedUser?.id) {
      setOnMyPage(true)
    }
  }, [user, loggedUser])


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

  useEffect(() => {
    dispatch(loadAllPosts())
  }, [dispatch])


  const handleClickFollow = async (e) => {
    e.preventDefault();

    const input = {
      user_id: loggedUser?.id,
      follows_id: user?.id
    }

    const blueBtnFollow = true
    await dispatch(postFollowBackend(input, user?.id, blueBtnFollow))
      .then(() => {
        setAlreadyFollowing(true)
      });
  }

  const handleClickUnfollow = async (e) => {
    e.preventDefault();
    const blueBtnUnfollow = true

    await dispatch(deleteFollowBackend(user?.id, loggedUser?.id, blueBtnUnfollow))
      .then(() => {
        setAlreadyFollowing(false)
      });
  }

  return (
    <>
      {user && (
        <div className='user-container-background'>
          <div className='user-information-container'>
            <div className='user-info-profile'>
              <img src={user?.profile_image} className='user-profile-pic' alt='previewImage' />
            </div>

            <div className='user-info-info'>
              <div className='header-line-styling'>
                <h2 className='h2-style-username'>{user?.username}</h2>

                {!onMyPage && !alreadyFollowing && (
                  <div className='follow-btn'>
                    <button onClick={handleClickFollow} className='follow-btn-styling'>Follow</button></div>
                )}

                {!onMyPage && alreadyFollowing && (
                  <div className='follow-btn'>
                    <button onClick={handleClickUnfollow} className='follow-btn-styling'>Unfollow</button></div>
                )}

              </div>

              <div className='user-stat-box'>
                <div className='post-count'><p><span className='bold'>{user?.num_posts}</span> posts</p></div>

                {follows?.followers && (

                  <div className='post-count pointer'>
                    <FollowerModal user={user} followers={follows?.followers} />
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
            {usersPosts?.map((post, i) => {
              return (
                <UserGetPostModal post={post} i={i} />
              )
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default User;
