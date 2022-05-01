import React,{useEffect,useState} from 'react';
import {MovieList} from '../../components'
import './movies.css'
import { getMovies,getGenres } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import  Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox';
import { Typography,FormControlLabel,FormGroup } from '@mui/material';



const Movies=()=>{

    const [movies,setMovies]=useState(null)
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState()
    const [order, setOrder] = useState('');
    const [sorterBy, setSorterBy]=useState('')
    const [genresChecked, setGenresChecked] = useState()
    const [genres, setGenres]= useState()



    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const handleChangeSort = (event) => {
        setSorterBy(event.target.value);
    };
    const handleChangeGenres = (e) => {
        setGenresChecked({ ...genresChecked, [e.target.name]: e.target.value });
        console.log(genresChecked)
    };

    const pageChange = (event, value) => {
        setPage(value);
    };

    
    useEffect(() => {
        
        async function getGenresfrombck(){
           const res= await getGenres();
           setGenres(res.data);
           let names=res.data.map((genre)=>genre.name)
           //let initialState={}
           //setGenresChecked({res.data.map((genre))})
           }
        
        getGenresfrombck();
        //console.log(genres)
     },[]);


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
        <Container className='container-movies'>
            <div className='filter-items'>
                <div className='filter-items-search'>
                    <input></input>
                </div>
                <div className='filter-items-selects'>
                    <Box sx={{minWidth:100}} component='div'>
                        <FormControl variant='standard' fullWidth className='select-item'>
                            <InputLabel id="input-sorter">Sort by</InputLabel>
                            <Select 
                            labelId="select-sorter-label"
                            id="select-sorter"
                            value={sorterBy}
                            label="Sorter"
                            onChange={handleChangeSort}
                            >
                                <MenuItem  value={'Date'}>Date</MenuItem>
                                <MenuItem  value={'Score'}>Score</MenuItem>
                                <MenuItem  value={'Popularity'}>Popularity</MenuItem>
                                <MenuItem  value={'Duration'}>Duration</MenuItem>
                                <MenuItem  value={'Certification'}>Certification</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Divider orientation='vertical' flexItem/>
                    <Box sx={{minWidth:100}} component='div' >
                        <FormControl variant='standard' fullWidth className='select-item'>
                            <InputLabel id="input-order">Order</InputLabel>
                            <Select
                            labelId="select-order-label"
                            id="select-order"
                            value={order}
                            label="Order"
                            onChange={handleChangeOrder}
                            >
                                <MenuItem value={'ASC'}>Ascending</MenuItem>
                                <MenuItem value={'DESC'}>Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div className='movie-content-box'>
            <div className='meniuleft'>
                    <Typography variant='h3'>Select Genres</Typography>
                    {genres && genres.map((genre)=>
                        <FormGroup key={genre.name}>
                        <FormControlLabel control={
                            <Checkbox name={genre.name}  onChange={handleChangeGenres} />
                        } label={genre.name} />
                        </FormGroup>
                    )}   
                </div>
                <div className='container-movies-content'>
                {
                //snackbar+circleloading+grid+containers
                }
                    {movies===null?
                    <div className='loading-movies'>
                        <CircularProgress />
                    </div>
                    :
                    <div component='div' className='container-movies-div'>
                        <ul  className='container-movies-grid'>
                        {movies.map((movie) =>
                            <li  key={movie.movieid}> 
                                <MovieList title={movie.title} genres={movie.Genres} duration={movie.duration} overview={movie.overview}
                                    movieid={movie.movieid} popularity={movie.popularity} posterPath={movie.poster_path} rating={movie.rating}
                                    releaseDate={movie.release_date} uscertification={movie.uscertification} trailer={movie.trailer} keywords={movie.keywords} 
                                    adult={movie.adult}/>  
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
        </Container>
        
    );
}

export default Movies;