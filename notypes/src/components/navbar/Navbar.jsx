import React,{useState,useRef,useEffect} from 'react'
import './navbar.css'
import {Routes, Route, BrowserRouter as Router,Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../images/Logo.png'







const Navbar = () => {
  const [menuBars, setMenuBars]=useState(false);
  const box = useRef(null);
  useOutsideAlerter(box);
  const [searchToggle, setSearchToggle]=useState("container2")
  const [inputSearch,setInputSearch]=useState()

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
            <div className='app__header-header'>
              <div className='app__header-logo'>
                <Typography variant='h1' component='h1'> MyMovieStand</Typography>
              </div>
              <div className='app__header-login' >
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign up</Link>
              </div>
            </div>

          <div className='app__header-navbar'>
            <div className='app__navbar-left'>
                <div className='app__navbar-hamburgermenu'>
                  <Button onClick={()=>{setMenuBars(!menuBars)}}><MenuIcon fontSize='large'/></Button>
                </div>
                <div className='app__navbar-left_logo' >
                  <Link to='/' ><img src={logo} alt='logo' /></Link>
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

            </div>
              
            <div className='app__navbar-right'>
               {/* <div class="search">
                <input type="text" class="search__input" aria-label="search" placeholder="enter your search"/>
                  <Button className='search__submit' aria-label="submit search"><SearchIcon fontSize='medium'/></Button>
              </div> */}
              <div className={searchToggle}>
                <div className='icon'>
                  
                  <Button className='search' onClick={()=>searchToggle==='container2'?setSearchToggle('container2 active'):setSearchToggle('container2')} aria-label="submit search">
                    <SearchIcon fontSize='medium'/>
                  </Button>
                </div>
                <div className="input">
                  <input type="text" aria-label='search' placeholder="Search a movie" value={inputSearch}/>
                  <Button className='clear' onClick={() => setInputSearch(() => "")}><ClearIcon/></Button>
                </div>
              </div>
              {/* <div className='app__navbar-right_search'>
                  <Button className='search' onClick={()=>searchToggle==='container2'?setSearchToggle('container2 active'):setSearchToggle('container2')} aria-label="submit search"><SearchIcon fontSize='medium'/></Button>   
              </div> */}
            </div>

          </div>
        </div>
            
        

    
  )
}

export default Navbar;