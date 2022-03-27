import React,{useState,useEffect,useRef} from 'react';
import './movie.css'
import {getMovie,getImages,getCredits} from '../../api';
import moment from 'moment'
import { Divider,Box, Button, Typography,Grid,ImageList,ImageListItem,ImageListItemBar/*Paper,Container,*/ } from '@mui/material'
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
   const [images,setImages]=useState(null);
   const [showImages,setShowImages]=useState(null)
   //const images=useRef(null);
   
   
   useEffect(() => {
      //console.log("child component mounted");
      
      async function getData(){
         const res= await getMovie(movieid);
         setMovie(res.data);
         const res2= await getImages(res.data.tmdb_id);
         const {backdrops,logos,posters}= res2.data
         setImages({backdrops,logos,posters});
         
         }
      
      getData();
   },[movieid]);
      
   const fetchImages = async (id) =>{
      
      const res= await getImages(id);
      const {backdrops,logos,posters}= res.data
      setImages({backdrops,logos,posters});
         
   }
   

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
      
      <Grid container spacing={1} className='container-grid' 
      sx={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}),linear-gradient(to bottom, #f0f0f0, #57525a)`}}>
         {//<img className='background' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
         }
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
                     <Typography component='span'>My rating</Typography>
                     <Typography component='span'>My status</Typography>
                  </Box>
             
            </Grid>
         </Grid>
         </Grid>



         <Grid item  xs={10} md={8}>
            {/*<Button onClick={(e)=>{e.preventDefault();
               fetchImages(movie.tmdb_id)}}>See more images </Button>*/}
            
            <ImageList sx={{ width: '350px', height: '450px' }}>
               {images && images.posters.map((item) => (
               <ImageListItem key={item.file_path}>
                  <img
                     src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
                     alt={movie.title}
                     loading="lazy"
                     width={'10%'}
                     height={'10%'}
                  />
                  {/*<ImageListItemBar
                     title={item.title}
                     subtitle={<span>by: {item.author}</span>}
                     position="below"
                  />*/}
               </ImageListItem>
               ))}
            </ImageList>
         </Grid>
         <Grid item  xs={2} md={4}>
               <Typography component='span'>Budget: ${movie.budget}</Typography>
               <Typography component='span'>Revenue: ${movie.revenue}</Typography>
               <Typography component='span'>Keywords: {movie.keywords}</Typography>   
         </Grid>
         <Grid item  xs={12} md={12}>
            Crew
         </Grid>

      </Grid>
      </Box>
   </StyledEngineProvider>
   )
};

export default Movie;