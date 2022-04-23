import React, {useState,useEffect} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter as Router,Link} from 'react-router-dom';
import {Navbar} from './components';
import {Footer,Home,Movies,Errorpage,Moviepage,Login,Signup} from './containers'
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch,useSelector } from 'react-redux';
import { actionVerify } from './store/userSlice';
import { actionGetWl } from './store/watchlistSlice';



export default function App() {
  const dispatch=useDispatch()
  const {user} =useSelector(state=>state.userReducer)
  useEffect(() => {
  
    dispatch(actionVerify())
    
  }, [dispatch])

  useEffect(() => {
    if(user)
      dispatch(actionGetWl())
  })
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
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='*' element={<Errorpage/>}/>
            </Routes>

        </div>
        <Footer/>
      </Router>
      
       
    </>
  );
}

