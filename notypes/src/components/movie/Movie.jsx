import React,{useState,useEffect} from 'react';
import './movie.css'
import {getMovie,getImages,getCredits} from '../../api';
import moment from 'moment'
import { Divider,Box, Button, Typography,Grid,ImageList,ImageListItem,Modal } from '@mui/material'
//import {Link} from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import imageUnknown from '../../images/unknown.jpg'
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import MovieIcon from '@mui/icons-material/Movie';
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

   const [movie, setMovie]=useState(null);
   const [bgColor, setBgColor]=useState('rgb(224, 155, 63)');
   const [images,setImages]=useState(null);
   const [credits,setCredits]=useState(null)
   const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   //const images=useRef(null);
   
   
   useEffect(() => {
      //console.log("child component mounted");
      
      async function getData(){
         const res= await getMovie(movieid);
         setMovie(res.data);
         const res2= await getImages(res.data.tmdb_id);
         const {backdrops,logos,posters}= res2.data
         setImages({backdrops,logos,posters});
         const res3= await getCredits(res.data.tmdb_id);
         const {crew,cast}= res3.data
         setCredits({crew,cast}); 
         }
      
      getData();
   },[movieid]);
      
      
    
//ramas homepage,tmdb link, imdb link 
  
      //de pus culoare cand adaugam in lista la element etc.   
      //de modificat members = nr membri, popularity=al cate-lea dupa nr membrii

/*      popularity, score, add to  favs(profile)/watchlist, 
      
      reviews, 
      comments
      
      */


if(movie===null)return (<>Loading</>)
else
return (
 <StyledEngineProvider injectFirst>  

      
   <Box className='container-movie' sx={{ flexGrow: 1 }} component='article'>
      
      <Grid container spacing={1} className='container-grid' 
      sx={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}),linear-gradient(to bottom, #f0f0f0, #57525a)`}}>
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
                        <Grid item xs={12} md={12} lg={7} component='div'>
                           <Typography className='overview-title' component='h6'>Synopsis</Typography>
                           <Divider flexItem/>
                           <Typography className='synopsis' component='p'>{movie.overview}</Typography>
                        </Grid>
                        {movie.trailer!=null?   
                        <Grid item xs={12} md={12} lg={5} component='div' className='trailer'
                         sx={{backgroundImage:`url(${`https://i.ytimg.com/vi/${movie.trailer}/mqdefault.jpg`})`}}>
                           <Button onClick={handleOpen} >
                              <PlayCircleOutlineIcon fontSize='large' />
                           </Button>
                           <Modal
                              open={open}
                              onClose={(e) => {
                                 e.preventDefault();
                                 handleClose();
                              }}
                              aria-labelledby={movie.title}
                              aria-describedby="trailer"
                              >
                              <Box className='trailermodal'>
                                 <Typography  sx={{width:'90vw',height:'90vh'}} component="iframe"
                                  src={`https://www.youtube.com/embed/${movie.trailer}?enablejsapi=1&wmode=opaque&autoplay=1`}/>
                              </Box>
                           </Modal>                           
                        </Grid>
                        :<></>}
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



         <Grid item  xs={12} md={7} lg={8}>
            {/*De pus Tabs pt fiecare tip de imagine*/}
            <Typography component='h5' variant='h5'>Gallery</Typography>
            <Divider flexItem/>
            <Box component='div' className='imageroot'>
               <ImageList  className="images" >
                {images && images.posters.map((item) => (
                  <ImageListItem  key={item.file_path}>
                     <img
                        src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
                        alt={movie.title}
                        loading="lazy" 
                     />
                  </ImageListItem>
               ))}
               {children}
               </ImageList>
            </Box>

         </Grid>
         <Grid className='financial' item  xs={12} md={5} lg={4}>
               <Typography component='h6'>Budget</Typography>
               <Typography component='span'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget)}</Typography>
               <Typography component='h6'>Revenue</Typography>
               <Typography component='span'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue)}</Typography>
               <Typography component='h6'>Keywords</Typography>
               <Typography component='p'>{movie.keywords}</Typography>   
         </Grid>
         <Grid item  xs={12} md={6} lg={6}>
            <Typography component='h5' variant='h5'>Cast</Typography>
            <Divider flexItem/>
            <ImageList  className="actors" cols={1} >
               {credits && credits.cast.map((item) => (
                  <ImageListItem key={item.character+item.name}>
                     <img
                        src={item.profile_path?`https://image.tmdb.org/t/p/original/${item.profile_path}`:imageUnknown}
                        alt={item.name}
                        loading="lazy" 
                     />
                     <StarBorderPurple500Icon fontSize='medium'/>
                     <Typography component='div'>
                        <Typography component='h5'>{item.character}</Typography>
                        <Typography component='h6'>{item.name}</Typography>
                     </Typography>
                  
                  </ImageListItem>
               ))}
            {children}
            </ImageList>
            
         </Grid>
         <Grid item  xs={12} md={6} lg={6}>
            <Typography component='h5' variant='h5'>Crew</Typography>
            <Divider flexItem/>
            <ImageList  className="crew" cols={1} >
               {credits && credits.crew.map((item) => (
                  <ImageListItem key={item.name+item.job}>
                     <img
                        src={item.profile_path?`https://image.tmdb.org/t/p/original/${item.profile_path}`:imageUnknown}
                        alt={item.name}
                        loading="lazy" 
                     />
                     <MovieIcon fontSize='medium'/>
                     <Typography component='div'>
                        <Typography component='h5'>{item.job}</Typography>
                        <Typography component='h6'>{item.name}</Typography>
                     </Typography>
                  
                  </ImageListItem>
               ))}
            {children}
            </ImageList>
         </Grid>
      </Grid>
      </Box>
    </StyledEngineProvider>
   )
};

export default Movie;