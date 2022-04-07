import React,{useState,useRef,useEffect} from 'react'
import './navbar.css'
import {Routes, Route, BrowserRouter as Router,Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import logo from '../../images/Logo.png'
import { Menu } from '@mui/material';








const Navbar = () => {
  const [menuBars, setMenuBars]=useState(false);
  const box = useRef(null);
  useOutsideAlerter(box);



  function useOutsideAlerter(ref) {
    useEffect(() => {
   
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("you just clicked outside of box!");
          setMenuBars(false)
        }
      }
   
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }
  


  return (
    
        
          <div className='app__header' ref={box}>
            {/* <div className='app__header'>
              <div className='app__header-logo-text'>MyMovieStand</div>
              <div className='app__navbar-right_login' id={menuBars?"droplogin":""}>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign up</Link>
              </div>
            
            </div> */}
            <div className='app__navbar-left'>
                <div className='app__navbar-hamburgermenu'>
                  <Button onClick={()=>{setMenuBars(!menuBars)}}><MenuIcon fontSize='large'/></Button>
                </div>
                <div className='app__navbar-left_logo' >
                  <Link to='/' ><img src={logo} alt='logo' />{/*<i className='logoName'>MovieUniverse</i>*/}</Link>
                </div>
                <div className='app__navbar-left_nav' id={menuBars?"dropdown":""} >
                    <nav >
                      <ul className='app__navbar-left_nav_menu' onBlur={()=>{setMenuBars(false)}}>
                        <li><Link to='/' onClick={()=>{setMenuBars(false)}}>Home</Link></li>
                        <li><Link to='/movies' onClick={()=>{setMenuBars(false)}}>Movies</Link></li>
                        <li><Link to='/watchlist' onClick={()=>{setMenuBars(false)}}>Watchlist</Link></li>
                        <li><Link to='/forum' onClick={()=>{setMenuBars(false)}}>Forum</Link></li>
                      </ul>
                    </nav>
                </div>

                

               
                {/* <div className='app__navbar-left_search_under'>
                  <TextField label="Search" id="outlined-size-small"  size="small" 
                  sx={{backgroundColor:'white' }}/>
                </div> */}
            </div>
              
            <div className='app__navbar-right'>
              
              <div className='app__navbar-right_search'>
                  <Button><SearchIcon fontSize='medium'/></Button>
                  
              </div>
            </div>
          </div>
            
        

    
  )
}

export default Navbar;