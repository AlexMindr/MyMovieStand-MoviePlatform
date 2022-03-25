import React from 'react';
import { useState,useEffect } from 'react';
import {getMovie} from '../../api';
//import {Movie} from '../components/Movie'
import './home.css'


const Home=() =>{
    const [movie, setMovie]=useState(null);
    
    
    useEffect(() => {
        getData();
    
    async function getData() {
        const response = await getMovie(550);
        const data = await response.data;
    
        // store the data into our books variable
        setMovie(data) ;
      }

    }, []);
    console.log(movie)
    return(<>st</>)
/*return (<>
<h1>MOVIE</h1>
{movie && (
      <div className="movie">

        
        <Movie key={movie.tmbdId} title={movie.title} tmbdId={movie.TmbdId} genres={movie.genres}
                releaseDate={movie.release_date} budget={movie.budget} posterPath={movie.poster_path} adult={movie.adult} overview={movie.overview}></Movie>
      </div>
)}
    
</>)



*/
}

export default Home;