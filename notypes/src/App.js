import React, {useState,useEffect} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter as Router,Link} from 'react-router-dom';
import {Navbar,} from './components';
import {Footer,Home,Movies,Errorpage} from './containers'
import {getMovie,getMovies} from './api';
import CssBaseline from '@mui/material/CssBaseline';

//import { Layout } from "antd";

//const { Footer } = Layout;



export default function App() {
  /*useEffect(() => {
  }, []);
 
  */
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
              <Route path='*' element={<Errorpage/>}/>
            </Routes>
        </div>
        <Footer/>
      </Router>
      
       
    </>
  );
}

