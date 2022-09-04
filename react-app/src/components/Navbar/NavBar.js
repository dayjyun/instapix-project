
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css'
import { useState } from 'react';
import PostFormModal from '../PostModal';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [profileToggle, setProfileToggle] = useState(false)
  const sessionUser = useSelector(state => state.session.user)


  const showMenu = e => {
    e.preventDefault()
    setProfileToggle(!profileToggle)
  }
  const handleHome = (e) => {
    e.preventDefault()
    setProfileToggle(false)
    history.push('/')
  }

  const handleExplore = e => {
    e.preventDefault()
    setProfileToggle(false)
    history.push('/explore')
  }

  const logout = e => {
    e.preventDefault()
    dispatch(sessionActions.logout())
    setProfileToggle(false)
    history.push('/')
  }
  const handleProfile = e => {
    e.preventDefault()
    setProfileToggle(false)
    history.push(`/users/${sessionUser?.id}`)
  }

  if (sessionUser) {
    return (
      <div className='nav-bar-container'>
        <div className='nav-buttons-left'>
          <button className='instapix-button' onClick={handleHome}>Instapix</button>
        </div>
        <div className='nav-buttons-right'>
          <button className='fa-solid fa-house house' onClick={handleHome}></button>
          <PostFormModal />
          <button className='fa-regular fa-compass explore' onClick={handleExplore}></button>
          <div className='profile-dropdown'>
            <div>
              <button className='profile-button' onClick={showMenu}>
                <img style={{ width: '1.9em', height: '1.9em' }} className='profile-img-circle-container' src={sessionUser?.profile_image} alt='preview'></img>
              </button>
            </div>
            {profileToggle && (
              <div className='dropdown-shadow'>
                <button className='profile-n-logout' onClick={handleProfile}>Profile</button>
                <button className='profile-n-logout' onClick={logout}>Log out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
}

export default NavBar;
