import React,{useState,useRef,useEffect} from 'react'
import './navbar.css'
import logo from '../../images/Logo.png'
import {NavLink, useNavigate,Link,useLocation} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import  IconButton  from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import {useSelector,useDispatch } from 'react-redux'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import {actionLogOut} from '../../store/userSlice'
import {stringAvatar} from '../../auxcomponents/avatar/Avatarfct'
import { setAfterLogout } from '../../store/watchlistSlice';
import { setAfterLogout as logoutReview } from '../../store/reviewSlice';
import debounce from 'lodash/debounce';
import {getMoviesSimpleFilter} from '../../api'
import {MovieSearchList} from '../index'


let notifications=[{id:1,content:"texttext",read:false},{id:2,content:"texttext2",read:true}]
function getUnreadNotif(notifications){
  let unreadNotif=notifications.filter(notif=>notif.read===false)
  return unreadNotif 

}



const Navbar = () => {

  const [menuBars, setMenuBars]=useState(false);
  const menuBox = useRef(null);
  const searchBox=useRef(null)
  useCloseSearch(searchBox);
  useCloseOnClickOutside(menuBox);
  const [searchToggle, setSearchToggle]=useState("container2");
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [show, setShow] = useState(true)
  const [inputSearch, setInputSearch]=useState('')
  const [searchResult, setSearchResult]=useState(null)
  const {user}=useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  var activeStyle = "active-link";
  

  const changeInput = (e) =>{
    setInputSearch(e.target.value)
    searchContent(inputSearch)
  }

  const searchContent = debounce((input) =>{
    async function getDataFiltered(query){
      const res= await getMoviesSimpleFilter(1,query);
      setSearchResult(res.data.movies);
      //console.log(res.data.movies)
      //setTotalPages(res.data.totalPages)
      }
    const query=`search=${input}`
    getDataFiltered(query)
  },1000)

  const handleLogout = () =>{
    dispatch(actionLogOut())
    dispatch(setAfterLogout())
    dispatch(logoutReview())
    navigate('/')
  }


  useEffect(()=>{
     if(user)
      setIsLoggedIn(true)
    else 
      setIsLoggedIn(false)
    
  },[user])

  

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
  
  
  const closeSearchClick = () =>{
    setInputSearch('')
    //setSearchToggle('container2')
    setSearchResult(null)

  }
  
  return (
          <div className='app__header' ref={menuBox}>
            <div className={`app__header-header ${show?'':'navbar--hidden'}`}>
              <div className='app__header-logo'>
                <Typography variant='h1' component='h1' className='big-logo'> MyMovieStand</Typography>
                <Typography variant='h1' component='h1' className='small-logo'> MMS</Typography>
              </div>
              <div className='app__header-login' >
              {user && isLoggedIn?
              <>
                <div className="dropdown-submenu">
                  <NavLink to={`/watchlist/${user.username}`}>
                    <IconButton className='watchlist-dropdown'><FormatListBulletedIcon fontSize='large'/></IconButton>
                  </NavLink>
                  <div className="dropdown-content">
                    <NavLink to={`/watchlist/${user.username}`}>Watchlist</NavLink>
                  </div>
                </div>
                <Divider orientation="vertical" flexItem  />
                <div className="dropdown-submenu">
                    <IconButton><CircleNotificationsIcon fontSize='large'/></IconButton> 
                    {notifications.length>0 && getUnreadNotif(notifications).length>0?
                    <span className='notification-length-unread'>
                      {getUnreadNotif(notifications).length}
                    </span>
                    :
                    <></>}
                  <div className="dropdown-content">
                    {getUnreadNotif(notifications).map(notif=>
                      <div key={notif.id}>{notif.content}</div>
                      )}
                     <NavLink to={`/notifications`}>Se all notifications</NavLink>
                  </div>
                </div>
                <Divider orientation="vertical" flexItem  />
                <><div className="dropdown-submenu">
                    <Button sx={{textTransform:'none'}}>{ user.username.length>10?user.username.substring(0,10)+'...':user.username}<ArrowDropDownIcon/></Button>
                    
                    <div className="dropdown-content">
                      <NavLink to={`/profile/${user.username}`}>Profile</NavLink>
                      <NavLink to={`/profile/${user.username}/reviews`}>My Reviews</NavLink>
                      <NavLink to={`/profile/${user.username}/posts`}>My Posts</NavLink>
                      <NavLink to={`/profile/edit/info`}><SettingsIcon fontSize='small' sx={{verticalAlign:'bottom'}}/>&nbsp;<span>Settings</span></NavLink>
                      <button onClick={handleLogout}><LogoutIcon fontSize='small' sx={{verticalAlign:'bottom'}}/>&nbsp;<span>Logout</span></button>
                    </div>
                  </div>
                  <NavLink to={`/profile/${user.username}`}><Avatar {...stringAvatar(user.fullname)} className='navbar__avatar' /></NavLink>
                </>
              </>
                :
                <>
                <NavLink state={{ from: location }} className={({ isActive }) =>
              isActive ? `login-button ${activeStyle} `: 'login-button'} to='/login'>Login</NavLink >
                <NavLink state={{ from: location }} className={({ isActive }) =>
              isActive ? `login-button ${activeStyle} `: 'login-button'} to='/signup'>Sign up</NavLink >
                </>
                }
              </div>
            </div>

          <div className={`app__header-navbar ${show?'':'navbar--hidden'}`}>
            <div className='app__navbar-left'>
                <div className='app__navbar-hamburgermenu'>
                  <IconButton onClick={()=>{setMenuBars(!menuBars)}}><MenuIcon fontSize='large'/></IconButton>
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
                        <li><NavLink className={({ isActive }) =>isActive ? activeStyle : undefined} to='/forum' 
                            onClick={()=>{setMenuBars(false)}}>Forum</NavLink ></li>
                      </ul>
                    </nav>
                </div>

            </div>
              
            <div className='app__navbar-right' ref={searchBox}>
              
              <div className={searchToggle}>
                <div className='icon'>
                  
                  <IconButton className='search' aria-label="submit search"
                     onClick={()=>searchToggle==='container2'?setSearchToggle('container2 active'):setSearchToggle('container2')} >
                    <SearchIcon fontSize='medium'/>
                  </IconButton>
                </div>
                <div className="input">
                  <input type="text" aria-label='search' placeholder="Search movie..."  value={inputSearch?inputSearch:''} 
                                onChange={changeInput}/>
                  <IconButton className='clear' onClick={() => setInputSearch(() => "")}><ClearIcon/></IconButton>
                  
                </div>
                
              </div>
              <div className={searchToggle==='container2 active' && inputSearch!==''?'dropdown-search open':'dropdown-search'}>
                {searchResult && searchResult.length>0?
                  searchResult.map(movie=>
                    <Link onClick={closeSearchClick} key={movie.movieid} to={`/movies/${movie.movieid}`}>
                      <MovieSearchList poster={movie.poster_path} title={movie.title}/>
                    </Link>)
                
                :<Button disabled variant='text'>Nothing matched your search</Button>
                }
              </div>
              
            </div>

          </div>
        </div>
            
        

    
  )
}

export default Navbar;