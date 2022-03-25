import React from 'react'
import './navbar.css'
//import {Ri3Menu,Ri3Line} from 'react-icons/ri'
import logo from '../../images/Logo.png'
const Navbar = () => {
  return (
    <div className='app__navbar'>
      <div className='app__navbar-links'>
        <div className='app__navbar-links_logo'>
          <img src={logo} alt='logo'></img>
        </div>
        <div className='app_navbar-links_container'></div>
      </div>

    </div>
  )
}

export default Navbar;