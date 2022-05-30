import React, {useState,useEffect} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter as Router,Outlet,useLocation,useNavigate} from 'react-router-dom';
import {Navbar} from './components';
import {Footer,Home,Movies,Errorpage,Moviepage,Login,Signup,Watchlistpage,
  Profile,Editprofile,Editfavourites,Reviewaddpage,Reviewspage,Userreviews,
  Postaddpage,Postpage,Movieposts,Userposts,AdminUser,AdminMenu,AdminMovie} from './containers'
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch,useSelector } from 'react-redux';
import { actionVerify } from './store/userSlice';
import { actionGetWl } from './store/watchlistSlice';
import { actionGetRevAndLikes } from './store/reviewSlice';
import  PageAuth from './auxcomponents/routerchecks/PageAuth'
import PageRedirect from './auxcomponents/routerchecks/PageRedirect'
import PageAdmin from './auxcomponents/routerchecks/PageAdmin'

//TODO switch countries with auto-complete countries from mui autocomplete
//TODO rating mui ?
//TODO redirect from form to login with saved location
export default function App() {
  const dispatch=useDispatch()
  const {user,verifiedThisSession} =useSelector(state=>state.user)
  const {fetchedThisSessionWl}=useSelector(state=>state.watchlist)
  const {fetchedThisSessionRev}=useSelector(state=>state.review)

  useEffect(() => {
    if(user && verifiedThisSession===false){
    dispatch(actionVerify())
    
  }
  }, [dispatch,user,verifiedThisSession])

  useEffect(() => {
    if(user && verifiedThisSession===true && fetchedThisSessionWl===false){
      dispatch(actionGetWl())
    }
  },[user,verifiedThisSession,fetchedThisSessionWl,dispatch])
  
  useEffect(() => {
    if(user && verifiedThisSession===true && fetchedThisSessionRev===false){
      dispatch(actionGetRevAndLikes())
    }
  },[user,verifiedThisSession,fetchedThisSessionRev,dispatch])
  

  return (
    
    <>
      <CssBaseline/>
      <Router>
        <Navbar/>
        <div className='app__content'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/movies' element={<Movies/>}/>
              <Route path='/movies/:id' element={<Moviepage/>}/>
              <Route path='/movies/:id/reviews/all' element={<Reviewspage/>}/>
              <Route path='/movies/:id/posts/all' element={<Movieposts/>}/>
              <Route path='/movies/:movieid/posts/post/:postid' element={<Postpage/>}/>
              <Route path='/watchlist/:username' element={<Watchlistpage/>}/>
             
              <Route path='/signup' element={ 
                <PageRedirect>
                  <Signup />
                </PageRedirect>
              }/>
              <Route path='/login' element={ 
                <PageRedirect>
                  <Login />
                </PageRedirect>
                
              }/>
              <Route path='/profile/:username' element={ 
                <PageAuth>
                  <Profile />
                </PageAuth>
              }/>
              <Route path='/profile/edit/info' element={ 
                <PageAuth>
                  <Editprofile />
                </PageAuth>
              }/>

              <Route path='/profile/:username/reviews' element={ 
                <PageAuth>
                  <Userreviews />
                </PageAuth>
              }/>

              <Route path='/profile/:username/posts' element={ 
                <PageAuth>
                  <Userposts />
                </PageAuth>
              }/>

              <Route path='/profile/edit/favourites' element={ 
                <PageAuth>
                  <Editfavourites />
                </PageAuth>
              }/>  
              <Route path='/movies/:id/addreview' element={ 
                <PageAuth>
                  <Reviewaddpage/>
                </PageAuth>
              }/>

              <Route path='/movies/:id/addpost' element={ 
                <PageAuth>
                  <Postaddpage/>
                </PageAuth>
              }/>
              <Route path='/admin' element={ 
                <PageAdmin>
                  <AdminMenu/>
                </PageAdmin>
              }/>
              <Route path='/admin/user' element={ 
                <PageAdmin>
                  <AdminUser/>
                </PageAdmin>
              }/>
              <Route path='/admin/movie' element={ 
                <PageAdmin>
                  <AdminMovie/>
                </PageAdmin>
              }/>  
              <Route path='*' element={<Errorpage/>}/>
            </Routes>

        </div>
        <Footer/>
      </Router>
      
       
    </>
  );
}

