
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useHistory } from 'react-router-dom';
import './Navbar.css'
import { useState } from 'react';
import PostFormModal from '../PostModal';
// import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'
// import ReactDropdown from 'react-dropdown';

const NavBar = () => {
  const history = useHistory()
  const [profileToggle, setProfileToggle] = useState(false)

  const showMenu = e => {
    e.preventDefault()
    if (profileToggle) {
      setProfileToggle(false)
    } else {
      setProfileToggle(true)
    }
  }
  const handleHome = (e) => {
    e.preventDefault()
    history.push('/')
  }

  const handleExplore = e => {
    e.preventDefault()
    history.push('/explore')
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
        <button className='fa-solid fa-house' onClick={handleHome}></button>
        <div className='new-post-button'>
          <PostFormModal />
        </div>
        <button className='fa-regular fa-compass' onClick={handleExplore}></button>
        <div className='profile-dropdown'>
          <button className='fa-regular fa-circle-user profile-button' onClick={showMenu}></button>
          {profileToggle && (
            <div className='dropdown-shadow'>
              <div>
                <button className='profile-n-logout'>Profile</button>
              </div>
              <div>
                <button className='profile-n-logout'>Log out</button>
              </div>
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
