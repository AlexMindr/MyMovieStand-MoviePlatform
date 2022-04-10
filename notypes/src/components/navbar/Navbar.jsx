import React,{useState,useRef,useEffect} from 'react'
import './navbar.css'
import logo from '../../images/Logo.png'
import {NavLink} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Navbar = () => {

  const [menuBars, setMenuBars]=useState(false);
  const menuBox = useRef(null);
  const searchBox=useRef(null)
  useCloseSearch(searchBox);
  useCloseOnClickOutside(menuBox);
  const [searchToggle, setSearchToggle]=useState("container2");
  const [inputSearch,setInputSearch]=useState();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [show, setShow] = useState(true)
  let activeStyle = "active-link";


  const controlNavbar = () => {
        if (window.scrollY > 100) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])

  


  function useCloseOnClickOutside(ref) {
    useEffect(() => {
   
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuBars(false)
        }
      }
   
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }
  
  function useCloseSearch(ref) {
    useEffect(() => {
   
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchToggle('container2')
        }
      }
   
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }
  
  
  return (
          <div className='app__header' ref={menuBox}>
            <div className={`app__header-header ${show?'':'navbar--hidden'}`}>
              <div className='app__header-logo'>
                <Typography variant='h1' component='h1' className='big-logo'> MyMovieStand</Typography>
                <Typography variant='h1' component='h1' className='small-logo'> MMS</Typography>
              </div>
              <div className='app__header-login' >
                {isLoggedIn?
                /*full name to be added */
                <Avatar {...stringAvatar('Kent Dodds')} />
                :
                <>
                <NavLink className={({ isActive }) =>
              isActive ? activeStyle : undefined} to='/login'>Login</NavLink >
                <NavLink  className={({ isActive }) =>
              isActive ? activeStyle : undefined} to='/signup'>Sign up</NavLink >
                </>}
              </div>
            </div>

          <div className={`app__header-navbar ${show?'':'navbar--hidden'}`}>
            <div className='app__navbar-left'>
                <div className='app__navbar-hamburgermenu'>
                  <Button onClick={()=>{setMenuBars(!menuBars)}}><MenuIcon fontSize='large'/></Button>
                </div>
                <div className='app__navbar-left_logo' >
                  <NavLink className={({ isActive }) =>
              isActive ? activeStyle : undefined} to='/' ><img src={logo} alt='logo' /></NavLink >
                </div>
                <div className='app__navbar-left_nav' id={menuBars?"dropdown":""} >
                    <nav >
                      <ul className='app__navbar-left_nav_menu' onBlur={()=>{setMenuBars(false)}}>
                        <li><NavLink className={({ isActive }) => isActive ? activeStyle : undefined} to='/' 
                            onClick={()=>{setMenuBars(false)}}>Home</NavLink ></li>
                        <li><NavLink className={({ isActive }) =>isActive ? activeStyle : undefined} to='/movies' 
                            onClick={()=>{setMenuBars(false)}}>Movies</NavLink ></li>
                        <li><NavLink className={({ isActive }) =>isActive ? activeStyle : undefined} to='/watchlist' 
                            onClick={()=>{setMenuBars(false)}}>Watchlist</NavLink ></li>
                        <li><NavLink className={({ isActive }) =>isActive ? activeStyle : undefined} to='/forum' 
                            onClick={()=>{setMenuBars(false)}}>Forum</NavLink ></li>
                      </ul>
                    </nav>
                </div>

            </div>
              
            <div className='app__navbar-right' ref={searchBox}>
              
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