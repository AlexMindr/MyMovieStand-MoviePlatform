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
      //console.log("child component mounted");
      
      async function getData(){
         const res= await getMovie(movieid);
         const data= await res.data
         setMovie(data);
         }
      
      getData();
   },[movieid]);
  
    //console.log("rendering child");
    //console.log(movie)
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
      
   <Box className='container' sx={{ flexGrow: 1 }} component='article'>
      
      <Grid container spacing={1} className='container-grid'>
         <img className='background' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
      
         <Grid item className='title-container'  xs={12} md={12}>
                  <Typography variant='h4'>{movie.original_title}</Typography>   
                  <Typography variant='h5'>{movie.title}</Typography>
         </Grid>
        
         <Grid item  className='movie-info' sx={{ bgcolor:bgColor  }}  xs={12} md={12}>
            <Grid container spacing={1} >
            <Grid item className='media' xs={12} md={4} lg={3}>
               <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
            </Grid>
                  
            <Grid item className='info-container'  xs={12} md={8} lg={9}>
                  <Box component='div' className='status-info'>  
                     <Typography variant="subtitle2" component='span'>Type: Movie</Typography>
                     <Divider orientation="vertical" flexItem></Divider>
                     <Typography variant="subtitle2" component='span'>Status: {movie.status}</Typography>
                     <Divider orientation="vertical" flexItem/>
                     <Typography variant="subtitle2" component='span'>Language: {movie.language.toUpperCase()}</Typography>
                  </Box> 
                  <Grid container spacing={1} className='popularity-info' >
                     <Grid item  xs={3} md={3} > <em className='score'>Score: {movie.rating?movie.rating:'N/A'}</em></Grid>
                     <Grid item  xs={3} md={3}>
                     <PeopleAltRoundedIcon fontSize='small' sx={{verticalAlign:'sub'}}/>
                        {movie.popularity?movie.popularity:'N/A'}   
                     </Grid>
                     <Grid item xs={3} md={3}> Members: N/A</Grid>
                  </Grid>  
                  {/*<Box component='div' >
                     <Typography variant="subtitle1" component='span' className='score'>Score: {movie.rating?movie.rating:'N/A'}</Typography>   
                     <Typography variant="subtitle1" component='span' >
                        <PeopleAltRoundedIcon fontSize='small' sx={{verticalAlign:'sub'}}/>
                        {movie.popularity?movie.popularity:'N/A'}
                        
                     </Typography>
                     <Typography variant="subtitle1" component='span'>Members: N/A</Typography>
                      </Box>*/}
                  
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
                     <Grid  container spacing={3} className='trailer-and-synopsis'>
                        <Grid item xs={12} md={5} lg={7} component='div'>
                           <Typography className='overview-title' component='h6'>Synopsis</Typography>
                           <Divider flexItem/>
                           <Typography className='synopsis' component='p'>{movie.overview}</Typography>
                        </Grid>
                        {movie.trailer!=null?   
                        <Grid item xs={12} md={7} lg={5} component='div' className='trailer'>
                              <Button onClick={
                                 (e) => {
                                    e.preventDefault();
                                    window.location.href=`https://www.youtube.com/embed/${movie.trailer}?enablejsapi=1&wmode=opaque&autoplay=1`
                                    }}
                               variant='text' >
                                  <PlayCircleOutlineIcon fontSize='large' />
                                  <img src={`https://i.ytimg.com/vi/${movie.trailer}/mqdefault.jpg`} alt={movie.title}/>
                               </Button>
                           
                        </Grid>
                        :<></>}
                        {/*<Typography className='synopsis' component='p'>{movie.overview}</Typography>
                     {movie.trailer!=null?   
                        <Typography className='trailer' component='div'>
                        <a href={`https://www.youtube.com/embed/${movie.trailer}?enablejsapi=1&wmode=opaque&autoplay=1`} >
                           <img src={`https://i.ytimg.com/vi/${movie.trailer}/mqdefault.jpg`} alt={movie.title}/>
                           <Button variant='text' ><PlayCircleOutlineIcon fontSize='large' /></Button>
                        </a>
                        </Typography>
                     :<></>}
                     */}
                     </Grid>
                  </Box>
                  <Divider flexItem/>
                  <Box component='div'>
                     <Button>Add to list</Button>
                  </Box>
             
            </Grid>
         </Grid>
         </Grid>



         <Grid item  xs={12} md={9}>
            Crew
         </Grid>
         <Grid item  xs={12} md={3}>
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