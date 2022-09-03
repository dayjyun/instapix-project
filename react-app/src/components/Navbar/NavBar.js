
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
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
    history.push('/')
  }

  const handleExplore = e => {
    e.preventDefault()
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
    history.push('/me')
  }

  return (
    <div className='nav-bar-container'>
      <div className='nav-buttons-left'>
        <button className='instapix-button' onClick={handleHome}>Instapix</button>
        {/* <div className='arrow-dropdown'>
          <button className='fa-solid fa-angle-down' onClick={showMenu}></button>
          {arrowToggle && (
            <div className='arrow-dropdown-list'>
              <button>Following</button>
              <button>Favorites</button>
            </div>
          )}
        </div> */}
      </div>
      <div className='nav-buttons-right'>
        <button className='fa-solid fa-house house' onClick={handleHome}></button>
        <PostFormModal />
        <button className='fa-regular fa-compass explore' onClick={handleExplore}></button>
        <div className='profile-dropdown'>
          <button className='profile-button' onClick={showMenu}>
            <img style={{ width: '1.9em', height: '1.9em' }} className='profile-img-circle-container' src={sessionUser?.profile_image} alt='preview'></img>
          </button>
          {profileToggle && (
            <div className='dropdown-shadow'>

              <button className='profile-n-logout' onClick={handleProfile}>Profile</button>
              <button className='profile-n-logout' onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </div>
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
