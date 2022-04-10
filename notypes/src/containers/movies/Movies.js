import React,{useEffect,useState} from 'react';
import {MovieList} from '../../components'
import './movies.css'
import { getMovies } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';

const Movies=()=>{

    const [movies,setMovies]=useState(null)

    useEffect(() => {
        //console.log("child component mounted");
        
        async function getData(){
           const res= await getMovies();
           setMovies(res.data);
           }
        
        getData();
     },[]);

     console.log(movies)

    return (
        <div className='pg'>
            <div className='meniuleft'>MENIU</div>
            <div className='container'>
            {
            //snackbar+circleloading+grid+containers
            }
                {movies===null?
                <CircularProgress/>:
                <ul>
                {movies.map((movie) =>
                   <li> 
                      <MovieList key={movie.movieid} title={movie.title} genres={movie.Genres} duration={movie.duration} overview={movie.overview}
                            movieid={movie.movieid} popularity={movie.popularity} posterPath={movie.poster_path} rating={movie.rating}
                            releaseDate={movie.release_date} uscertfication={movie.uscertfication}/>  
                   </li>
                   )
               }
               </ul>
      
                }
            </div>
        </div>
        
    );
}

export default Movies;