import React,{useEffect,useState} from 'react';
import {MovieList} from '../../components'
import './movies.css'
import { getMovies,getGenres } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox';
import { Typography,FormControlLabel,FormGroup,Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Movies=()=>{

    const [movies,setMovies]=useState(null)
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState()
    const [order, setOrder] = useState('');
    const [sorterBy, setSorterBy]=useState('')
    const [genresChecked, setGenresChecked] = useState()
    const [genres, setGenres]= useState(null)
    const [inputSearch, setInputSearch]=useState()

    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const handleChangeSort = (event) => {
        setSorterBy(event.target.value);
    };
    const handleChangeGenres = (e) => {
        setGenresChecked({ ...genresChecked,[e.target.name]: e.target.checked });
    };

    const pageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        let initialState={}
        async function getGenresfrombck(){
           const res= await getGenres();
           setGenres(res.data);
           
           res.data.forEach((genre)=>initialState[genre.name]=false)
        }    
        getGenresfrombck();
        setGenresChecked(initialState)
    },[]);


    useEffect(() => {
        
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
                <div className='search-filter'>
                    <div className='search-filter-container'>
                        <div className='icon'>
                    
                            <Button className='search' 
                            //onClick={()=>searchToggle==='container2'?setSearchToggle('container2 active'):setSearchToggle('container2')}
                            aria-label="submit search">
                            <SearchIcon fontSize='medium' />
                            </Button>
                        </div>
                        <div className="input">
                            <input type="text" aria-label='search' placeholder="Search movie..." value={inputSearch} 
                                onChange={(e)=>{setInputSearch(e.target.value);console.log(e.target.value)}}/>
                            <Button className='clear'onClick={()=>setInputSearch('')} >
                                <ClearIcon/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='filter-items-selects'>
                    <div className="dropdown-selectgenres">
                      <label className='dropdown-selectgenres-label'>Genres &nbsp;&nbsp;&nbsp;<ArrowDropDownIcon fontSize='small' 
                      sx={{verticalAlign:'bottom'}}/></label>
                        <div className="dropdown-selectgenres-content">
                            <FormGroup >
                            {genres && genres.map((genre)=>
                            <FormControlLabel key={genre.genreid} control={
                                <Checkbox name={genre.name} 
                                value={genresChecked[genre.name]?genresChecked[genre.name]:''}
                                checked={genresChecked[genre.name]?genresChecked[genre.name]:false}
                                onChange={handleChangeGenres} 
                                inputProps={{ 'area-labeled': 'controlled' }} 
                                />
                            } label={genre.name} />
                            )}
                            </FormGroup>
                        
                    </div>
                    </div>
                    <Divider orientation='vertical' flexItem/>
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
                    <Typography variant='h5' component='h3' >Select Genres</Typography>
                    <FormGroup >
                    {genres && genres.map((genre)=>
                        <FormControlLabel key={genre.genreid} control={
                            <Checkbox name={genre.name} 
                            value={genresChecked[genre.name]?genresChecked[genre.name]:''}
                             checked={genresChecked[genre.name]?genresChecked[genre.name]:false}
                             onChange={handleChangeGenres} 
                             inputProps={{ 'area-labeled': 'controlled' }} 
                             />
                        } label={genre.name} />
                       
                        
                    )}
                    </FormGroup>
                      
  
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