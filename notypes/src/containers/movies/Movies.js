import React,{useEffect,useState} from 'react';
import {MovieList} from '../../components'
import './movies.css'
import { getMovies } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';


const Movies=()=>{

    const [movies,setMovies]=useState(null)
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState()
    
    const pageChange = (event, value) => {
        setPage(value);
    };

    

    useEffect(() => {
        //console.log("child component mounted");
        
        async function getData(){
           const res= await getMovies(page);
           setMovies(res.data.movies);
           setTotalPages(res.data.totalPages)
           }
        
        getData();
     },[page]);

    

    return (
        <div className='pg'>
            <div className='meniuleft'>MENIU</div>
            <div className='container'>
            {
            //snackbar+circleloading+grid+containers
            }
                {movies===null?
                <div className='loading-movies'>
                    <CircularProgress />
                </div>
                :
                <div className='container-movies'>
                    <ul>
                    {movies.map((movie) =>
                        <li key={movie.movieid}> 
                            <MovieList title={movie.title} genres={movie.Genres} duration={movie.duration} overview={movie.overview}
                                movieid={movie.movieid} popularity={movie.popularity} posterPath={movie.poster_path} rating={movie.rating}
                                releaseDate={movie.release_date} uscertfication={movie.uscertfication}/>  
                        </li>
                        )
                    }
                    </ul>
               </div>
                }
                {movies!==null?
                <div className='container-pagination'>
                    <Pagination count={totalPages} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={pageChange}/>
                </div>:
                <></>}
            </div>
        </div>
        
    );
}

export default Movies;