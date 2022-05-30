import React,{useEffect,useState,useRef} from 'react';
import {MovieList} from '../../components'
import './movies.css'
import { getMovies,getGenres,getMoviesFiltered } from '../../api';
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



const allValEq = (obj,valComp)=>{
    let isvalComp=Object.values(obj).every(value => {
    if (value === valComp) {
      return true;
    }
  
    return false;
  });
  return isvalComp

}
  


const Movies=()=>{
    //const genresCheckedInitial=useRef()
    const [movies,setMovies]=useState(null)
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState()
    const [order, setOrder] = useState('');
    const [sorter, setSorter]=useState('')
    const [genresChecked, setGenresChecked] = useState(null)
    const [genres, setGenres]= useState(null)
    const [inputSearch, setInputSearch]=useState('')
    const [queryGlobal,setQueryGlobal]=useState(null)
    
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const handleChangeSort = (event) => {
        setSorter(event.target.value);
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


    useEffect(()=> {
        async function getDataFiltered(query){
            const res= await getMoviesFiltered(page,query);
            setMovies(res.data.movies);
            setTotalPages(res.data.totalPages)
            }
        async function getData(){
            const res= await getMovies(page);
            setMovies(res.data.movies);
            setTotalPages(res.data.totalPages)
            }
        let toQuery={checked:null,order:null,sorter:null,search:null}
        if(genresChecked && !allValEq(genresChecked,false)){
            let checkedGen=''
            for (const [key, value] of Object.entries(genresChecked)) {
                if(value===true)
                    checkedGen+=key+','
              }
            checkedGen=checkedGen.slice(0,-1)
            if(checkedGen)
                toQuery.checked=checkedGen
        }      
        if(sorter && sorter!=='')
            toQuery.sorter=sorter
        if(order && order!=='')
            toQuery.order=order
        if(inputSearch && inputSearch!=='')
            toQuery.search=inputSearch
        let query=''
        if(!allValEq(toQuery,null)){
            for (const [key, value] of Object.entries(toQuery)) {
                if(value)
                    query+=`${key}=${value}&`
            }
        query=query.slice(0,-1)
        if(queryGlobal!==query){
            pageChange(null,1)
        }
        setQueryGlobal(query)
        
        getDataFiltered(query);
        }
        
        if(genresChecked && inputSearch==='' &&order==='' && sorter==='' && allValEq(genresChecked,false)){
            if(queryGlobal && !allValEq(queryGlobal,null)){
                setQueryGlobal(null)
                pageChange(null,1)
            }
            getData()
        }
        

    },[order,sorter,inputSearch,genresChecked,genres,page,queryGlobal])

   


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
                            <input type="text" aria-label='search' placeholder="Search movie..." value={inputSearch?inputSearch:''} 
                                onChange={(e)=>{setInputSearch(e.target.value)}}/>
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
                            value={sorter}
                            label="Sorter"
                            onChange={handleChangeSort}
                            >
                                <MenuItem  value={'release_date'}>Date</MenuItem>
                                <MenuItem  value={'rating'}>Score</MenuItem>
                                <MenuItem  value={'popularity'}>Popularity</MenuItem>
                                <MenuItem  value={'duration'}>Duration</MenuItem>
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
                    {/* <Tooltip title="AND: Movies must have all the genres selected;
                             OR: Movies must have at least one of the selected genres" placement="bottom" arrow> */}
                        <Typography variant='h5' component='h3' >Select Genres</Typography>
                    {/* </Tooltip> */}
                    {/* {genres && 
                    <FormControl className='radio-search'>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-genres"
                            name="radio"
                            value={genresChecked.radio}
                            onChange={handleChangeRadio}
                            row
                            >
                            <FormControlLabel value="and" control={<Radio />} label="AND" />
                            <FormControlLabel value="or" control={<Radio />} label="OR" />
                        </RadioGroup>
                    </FormControl>
                    } */}
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
                    movies.length>=1?
                    <div component='div' className='container-movies-div'>
                        <ul  className='container-movies-grid'>
                        {movies.map((movie) =>
                            <li  key={movie.movieid}> 
                                <MovieList title={movie.title} genres={movie.Genres} duration={movie.duration} overview={movie.overview}
                                    movieid={movie.movieid} popularity={movie.popularity} posterPath={movie.poster_path} rating={movie.rating}
                                    releaseDate={movie.release_date} uscertification={movie.uscertification} trailer={movie.trailer} keywords={movie.keywords} 
                                    adult={movie.adult} status={movie.status}/>  
                            </li>
                            )
                        }
                        </ul>
                        
                    </div>
                    :<div className='loading-movies'>
                        <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>No results</Typography>    
                    </div>
                    }
                    {movies!==null&&movies.length>=1?
                    <div className='container-pagination'>
                        <Pagination count={totalPages} page={page?page:1} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={pageChange}/>
                    </div>:
                    <></>}
                </div>
         </div>
        </Container>
        
    );
}

export default Movies;