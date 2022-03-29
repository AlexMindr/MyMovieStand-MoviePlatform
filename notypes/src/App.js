import React, {useState,useEffect} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter as Router,Link} from 'react-router-dom';
import {Home, Navbar,/*Movie*/} from './containers';
import {Movie} from './components';
import {Box } from '@mui/material'
import PropTypes from 'prop-types';
import {getMovie,getMovies} from './api';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
//import Movies from './routes/Movies';
//import WatchList from './routes/WatchList';
//import { Layout } from "antd";

//const { Footer } = Layout;


/*<Movie key={movie.movieid} adult={movie.adult} movieid={movie.movieid} backgroundPath={movie.backdrop_path} originalTitle={movie.original_title} 
    title={movie.title} tmbdId={movie.tmdb_id} genres={movie.Genres}
    releaseDate={movie.release_date} budget={movie.budget} posterPath={movie.poster_path}  overview={movie.overview}>  
    </Movie>
    

/*
<Router>
<div className="App">
  <nav>
    <Link to='/'>Home</Link>
    {/*<Link to='/movies'>Movies</Link>}
  </nav>
  
  
  <Routes>
      <Route path="/" element={<Home />} />
      {/*<Route path="movies" element={<Movies />} />
      <Route path="list" element={<WatchList/>}/>}
    </Routes>
  
  {<Layout>
    
    <Routes>
      <Route path="/" element={<Home />} />
      {/*<Route path="movies" element={<Movies />} />
      <Route path="list" element={<WatchList/>}/>
    </Routes>
    <Footer>
      Scris
    </Footer>
  </Layout>}
</div>
</Router>
*/


export default function App() {
  /*useEffect(() => {
   // console.log("on Parent mount");
  }, []);
 // console.log("rendering parent");

  */
  return (
    
    <>
    <StyledEngineProvider injectFirst>
      <CssBaseline/>
      <Movie movieid={1} />
    </StyledEngineProvider>
   </>
  );
}

