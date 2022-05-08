import React, {useState,useEffect} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter as Router,Outlet,useLocation,useNavigate} from 'react-router-dom';
import {Navbar} from './components';
import {Footer,Home,Movies,Errorpage,Moviepage,Login,Signup,Watchlistpage,Profile} from './containers'
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch,useSelector } from 'react-redux';
import { actionVerify } from './store/userSlice';
import { actionGetWl } from './store/watchlistSlice';
import {default as PageAuth} from './components/routerchecks/PageAuth'
import {default as PageRedirect} from './components/routerchecks/PageRedirect'


//TODO overflow:elipsis pt titlurile lungi?
//TODO switch countries with auto-complete countries from mui autocomplete
//TODO rating mui ?
//TODO redirect from form to login with saved location
//TODO autocomplete component la search sus?
//TODO bind var to sequelize.literal
export default function App() {
  const dispatch=useDispatch()
  const {user,verifiedThisSession} =useSelector(state=>state.user)
  const {fetchedThisSession}=useSelector(state=>state.watchlist)
  
  useEffect(() => {
    if(user && verifiedThisSession===false){
    dispatch(actionVerify())
    
  }
  }, [dispatch,user,verifiedThisSession])

  useEffect(() => {
    if(user && verifiedThisSession===true && fetchedThisSession===false){
      dispatch(actionGetWl())
    }
  },[user,verifiedThisSession,fetchedThisSession,dispatch])
  
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
              {/* <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/> */}
              <Route path='/profile/:username' element={ 
                <PageAuth>
                  <Profile />
                </PageAuth>
              }/> 
              <Route path='*' element={<Errorpage/>}/>
            </Routes>

        </div>
        <Footer/>
      </Router>
      
       
    </>
  );
}

