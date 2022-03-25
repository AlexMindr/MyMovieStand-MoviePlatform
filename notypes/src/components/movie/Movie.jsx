import React,{useState,useEffect} from 'react';
import './movie.css'
import {getMovie} from '../../api';
import moment from 'moment'
import { Divider,Box, Button, Typography,Grid,Chip/*Paper,Container,*/ } from '@mui/material'
//import {Link} from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
//import { alignProperty } from '@mui/material/styles/cssUtils';


function numFormatter(num) {
   if(num > 999 && num < 1000000){
       return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
   }else if(num > 1000000){
       return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
   }else if(num < 999){
       return num; // if value < 1000, nothing to do
   }
}


const Movie = ({movieid,children}) => {

   const [movie, setMovie]=useState();
   const [bgColor, setBgColor]=useState('rgb(224, 155, 63)');
   
   useEffect(() => {
      console.log("child component mounted");
      
      async function getData(){
         const res= await getMovie(movieid);
         const data= await res.data
         setMovie(data);
         }
      
      getData();
   },[movieid]);
  
    console.log("rendering child");
    console.log(movie)
//ramas homepage  
  
      //de pus culoare cand adaugam in lista la element etc.   
      //de modificat members = nr membri, popularity=al cate-lea dupa nr membrii

/*      popularity, score, add to  favs(profile)/watchlist, 
      cast gallery, 
      reviews, 
      comments
      
      */


if(movie===undefined)return (<>Loading</>)
else
return (

<StyledEngineProvider injectFirst> 
      
   <Box className='container' sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} className='container-grid'>
         <img className='background' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
   
         <Grid className='title-container' item xs={12} md={12}>
                  <Typography variant='h4'>{movie.original_title}</Typography>   
                  <Typography variant='h5'>{movie.title}</Typography>
         </Grid>
        
         <Box component='div' className='movie-info' sx={{ bgcolor:bgColor  }}>
            <Grid item className='media' xs={6} md={3}>
               <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
            </Grid>
                  
            <Grid item className='info-container'  xs={6} md={9}>
                  
                  <Box component='div' className='status-info'>
                     <Typography variant="subtitle2" component='span'>Type: Movie</Typography>
                     <Divider orientation="vertical" flexItem></Divider>
                     <Typography variant="subtitle2" component='span'>Status: {movie.status}</Typography>
                     <Divider orientation="vertical" flexItem/>
                     <Typography variant="subtitle2" component='span'>Language: {movie.language.toUpperCase()}</Typography>
                  </Box>
                  
                  <Box component='div' className='popularity-info'>
                     <Typography variant="subtitle1" component='span' className='score'>Score: {movie.rating?movie.rating:'N/A'}</Typography>   
                     <Typography variant="subtitle1" component='span' >
                        <PeopleAltRoundedIcon fontSize='small' sx={{verticalAlign:'sub'}}/>
                        {movie.popularity?movie.popularity:'N/A'}
                        
                     </Typography>
                     <Typography variant="subtitle1" component='span'>Members: N/A</Typography>
                     </Box>
                  
                  <Box component='div' className='time-info'>
                     <Typography variant="subtitle1" component='span' className='certification'>
                        {movie.adult?'Adult movie':movie.uscertification}
                     </Typography>
                     <Typography variant="subtitle1" component='span'>
                        Runtime: {Math.round(parseInt(movie.duration)/60)}h {parseInt(movie.duration)%60}min
                     </Typography>
                     <Divider orientation="vertical" flexItem/>
                     <Typography variant="subtitle1" component='span'>
                        Release Date: {moment(movie.release_date).format('d MMMM YYYY')}
                     </Typography>
                  </Box>
                  <Box component='div' className='genres'>
                     {
                     //cautare pe fiecare
                     }
                           {movie.Genres.map(({genreid,name}) => 
                           <Button  variant='outlined' key={genreid}>
                           {name}
                           </Button>)
                           }
                  </Box>
                  <Box className='container-synopsis' component='div'>
                     <Typography className='overview-title' component='h6'>Synopsis</Typography>
                     <Divider flexItem/>
                     <Box component='div' className='trailer-and-synopsis'>
                        <Typography className='synopsis' component='p'>{movie.overview}</Typography>
                     {movie.trailer!=null?   
                        <Typography className='trailer' component='div'>
                        <a href={`https://www.youtube.com/embed/${movie.trailer}?enablejsapi=1&wmode=opaque&autoplay=1`} >
                           <img src={`https://i.ytimg.com/vi/${movie.trailer}/mqdefault.jpg`} alt={movie.title}/>
                           <Button variant='text' ><PlayCircleOutlineIcon fontSize='large' /></Button>
                        </a>
                        </Typography>
                     :<></>}
                     </Box>
                  </Box>
                  <Divider flexItem/>
                  <Box component='div'>
                     <Button>Add to list</Button>
                  </Box>
             
            </Grid>
         </Box>
                   
            <Grid item  xs={6} md={9}>
               Crew
            </Grid>
            <Grid item  xs={6} md={3}>
               
                  <Typography component='p'>Budget: ${movie.budget}</Typography>
                  <Typography component='p'>Revenue: ${movie.revenue}</Typography>
                  <Typography component='span'>Keywords: {movie.keywords}</Typography>
                  
               
            </Grid>
         </Grid>
      </Box>
   </StyledEngineProvider>
   )
};

export default Movie;