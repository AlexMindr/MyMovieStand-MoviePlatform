import React from 'react';
//import Movie from './components/movie/Movie'
import './movies.css'



const Movies=()=>{

    return (
        <div className='pg'>
        <div className='meniuleft'>MENIU</div>
        <div className='container'>
        {
        //snackbar+circleloading+grid+containers
        }
        MOVIES
            <ul>
            {
                // movies.map((movie) =>
                // <li> 
                //     <Movie  key={movie.tmbdId} title={movie.title} tmbdId={movie.TmbdId} genres={movie.genres}
                //     releaseDate={movie.release_date} budget={movie.budget} posterPath={movie.poster_path} adult={movie.adult} overview={movie.overview}/>  
                // </li>)
                
            }
            </ul>

        {/*<Movie key={movie.tmbdId} title={movie.title} tmbdId={movie.TmbdId} genres={movie.genres}
                       releaseDate={movie.release_date} budget={movie.budget} posterPath={movie.poster_path} adult={movie.adult} overview={movie.overview}>  
             </Movie>
        
                    
         
         <Movie key={movie2.tmbdId} title={movie2.title} tmbdId={movie2.TmbdId} genres={movie2.genres}
               releaseDate={movie2.release_date} budget={movie2.budget} posterPath={movie2.poster_path} adult={movie2.adult} overview={movie2.overview}></Movie>
        
     
        <Movie key={movie3.tmbdId} title={movie3.title} tmbdId={movie3.TmbdId} genres={movie3.genres}
               releaseDate={movie3.release_date} budget={movie3.budget} posterPath={movie3.poster_path} adult={movie2.adult} overview={movie3.overview}></Movie>
    */}
          </div>
          </div>
        
    );
}

export default Movies;