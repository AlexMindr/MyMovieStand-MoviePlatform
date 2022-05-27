import React,{useState,useEffect} from 'react';
import './movie.css'
import {getMovie,getImages,getCredits, getMovieReviews,getMoviePosts} from '../../api';
import moment from 'moment'
import { Divider,Box, Button, Typography,Grid,ImageList,ImageListItem,Modal,Paper } from '@mui/material'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import imageUnknown from '../../images/unknown.jpg'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Link,useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import WatchlistForm from '../watchlist/WatchlistForm';
import StarIcon from '@mui/icons-material/Star';
import MovieImgHoriz from './MovieImgHoriz';
import {MovieReview,PostTitle} from '../index'
import {numFormatter} from '../../auxcomponents/functions/NumberFormat'

const post={title:'TITLE TITLE TITLE TITLE TITLE TITLE TITLE TITLE TITLE TITLE TITLETITLETITLETITLETITLETITLETITLE',
User:{username:'SERNASERNAUSERNAMEEUSERNAMEEUSERNAMEEUSERNAMEEUSERNAMEEUSERNAMEEUSERNAMEE'},createdAt:'DATE',commentCount:100}

const Movie = ({movieid,children}) => {

   const [movie, setMovie]=useState(null);
   const [bgColor, setBgColor]=useState('rgb(224, 155, 63)');
   const [images,setImages]=useState(null);
   const [credits,setCredits]=useState(null)
   const [openTrailer, setOpenTrailer] = useState(false);
   const [openWatchForm, setOpenWatchForm] = useState(false);
   const [wlData,setWlData]=useState(null)
   const [reviewsList,setReviewsList]=useState(null)
   const [postsList,setPostsList]=useState(null)
   const {watchlist}= useSelector(state=>state.watchlist)
   const {user}=useSelector(state=>state.user)
   const {reviews}=useSelector(state=>state.review)
   const location = useLocation()
   
   
   const handleOpenTrailer = () => setOpenTrailer(true);
   const handleCloseTrailer = () => setOpenTrailer(false);
   const handleOpenWatchForm = () => setOpenWatchForm(true);
   const handleCloseWatchForm = () => setOpenWatchForm(false);
   
   useEffect(()=>{
      if(watchlist){
        const wlFill=watchlist.filter(item=>item.movieid===movieid)
        
        if (wlFill.length>0){
            setWlData({...wlFill[0]})
            switch (wlFill[0].status){
               case 'Watching':
                  setBgColor('rgb(153, 255, 51)')
                  break;
               case 'Completed':
                  setBgColor('rgb(79, 116, 227)')
                  break;
               case 'Plan to watch':
                  setBgColor('rgb(204, 204, 204)')
                  break;
               case 'On-hold':
                  setBgColor('rgb(240, 230, 140)')
                  break;
               case 'Dropped':
                  setBgColor('rgb(244, 138, 160)')
                  break;
               default:
                  setBgColor('rgb(224, 155, 63)')
            }
        }
      }
   },[movieid,watchlist])

   
   useEffect(() => {
      
      async function getData(){
         const res= await getMovie(movieid);
         setMovie(res.data);
         const res2= await getImages(res.data.tmdb_id);
         const {backdrops,logos,posters}= res2.data
         setImages({backdrops,logos,posters});
         const res3= await getCredits(res.data.tmdb_id);
         const {crew,cast}= res3.data
         setCredits({crew,cast}); 
         const res4= await getMovieReviews(movieid,1,4);
         setReviewsList(res4.data.reviews);
         const res5= await getMoviePosts(movieid,1,3);
         setPostsList(res5.data.posts);   
      }
      
      getData();
   },[movieid]);
      
    //console.log(location.pathname)
//ramas homepage,tmdb link, imdb link 
  
      //de modificat members = nr membri, popularity=al cate-lea dupa nr membrii
      //posts

if(movie===null)
   return (<Box sx={{ display: 'flex', position:'absolute', right:'50%',top:'40%' }}>
               <CircularProgress />
           </Box>)
else
   return (
 
   <Box className='article-movie' sx={{ flexGrow: 1 }} component='div'>
      
      <Grid container spacing={1} className='container-grid' 
      sx={{backgroundImage:`url(${`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}),linear-gradient(to bottom, #f0f0f0, #57525a)`}}>
         <Grid item className='title-container'  xs={12} md={12}>
                  <Typography variant='h3'>{movie.original_title}</Typography>   
                  <Typography variant='h4'>{movie.title}</Typography>
         </Grid>
        
         <Grid item  className='movie-info' sx={{ bgcolor:bgColor  }}  xs={12} md={12}>
            <Grid container spacing={1} >
            <Grid item className='media-movie' xs={12} md={4} lg={3}>
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
                     <Grid item  xs={3} md={3} > 
                        
                        <em className='score'>
                           <StarOutlineIcon fontSize='small' sx={{verticalAlign:'sub'}}/>
                            {movie.rating?movie.rating:'N/A'}
                        </em>
                     </Grid>
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
                     <Grid  container spacing={2} className='trailer-and-synopsis'>
                        <Grid item xs={12} sm={6} md={7} lg={7} component='div'>
                           <Typography className='overview-title' component='h6'>Synopsis</Typography>
                           <Divider flexItem/>
                           <Typography className='synopsis' component='p'>
                              {movie.overview?movie.overview:<em>No synopsis has been added</em>}
                           </Typography>
                        </Grid>
                        {movie.trailer!=null?   
                        <Grid item  xs={12} sm ={6} md={5} lg={5} component='div' className='trailer'
                         sx={{backgroundImage:`url(${`https://i.ytimg.com/vi/${movie.trailer}/mqdefault.jpg`})`}}>
                           <Button onClick={handleOpenTrailer} >
                              <PlayCircleOutlineIcon fontSize='large' />
                           </Button>
                           <Modal
                              open={openTrailer}
                              onClose={(e) => {
                                 e.preventDefault();
                                 handleCloseTrailer();
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
                  {user?
                  <>
                  {/* //TODO mask my rating/status or blur if they arent in my list */}
                  <Box component='div' className='movie-add-edit'>
                     {wlData===null?<>
                     <Button onClick={handleOpenWatchForm}><AddCircleIcon/>Add to list</Button>
                     <Modal
                              open={openWatchForm}
                              onClose={(e) => {
                                 e.preventDefault();
                                 handleCloseWatchForm();
                              }}
                              aria-labelledby={'add'+movie.title}
                              aria-describedby="formWatchlist"
                              >
                              <Box className='watchformmodal'>
                                 <Box  sx={{width:'70vw',height:'90vh'}} component="div">
                                    <WatchlistForm movieid={parseInt(movieid)} type={'movie'}
                                     handleCloseWatchForm={handleCloseWatchForm} title={movie.title} episodesTotal={1}/>
                                 </Box>
                              </Box>
                     </Modal>
                     </>
                     :
                     <>
                     <Button onClick={handleOpenWatchForm} sx={{color:'rgb(200, 0, 0)'}}>Edit entry</Button>
                     <Modal
                              open={openWatchForm}
                              onClose={(e) => {
                                 e.preventDefault();
                                 handleCloseWatchForm();
                              }}
                              aria-labelledby={'edit'+movie.title}
                              aria-describedby="formWatchlist"
                              >
                              <Box className='watchformmodal'>
                                 <Box  sx={{width:'70vw',height:'90vh'}} component="div">
                                    <WatchlistForm movieid={parseInt(movieid)} type={'movie'}
                                     handleCloseWatchForm={handleCloseWatchForm} title={movie.title} episodesTotal={1}/>
                                 </Box>
                              </Box>
                     </Modal>
                     
                     <Typography component='span' className='movie-wl-rating'>
                        <StarIcon className='icn' sx={{color:'rgb(229, 187, 0)'}}/>{wlData.rating}&nbsp;
                     </Typography>
                     <Typography component='span' className='movie-wl-status'>&nbsp;{wlData.status}&nbsp;</Typography>
                     </>
                     }
                  </Box>
                  </>
                  :
                  //TODO style/verify
                  <Box>
                     <Link to='/login' state={{ from: location }}>Login to add movie to your list</Link>
                  </Box>
                  }   
            </Grid>
         </Grid>
         </Grid>



         <Grid item  xs={12} md={7} lg={8}>
            <Typography component='h5' variant='h5'>Gallery</Typography>
            <Divider flexItem/>
            {images? <MovieImgHoriz images={images} title={movie.title}/>:<div>Loading images...</div>}
         </Grid>
         <Grid className='financial' item  xs={12} md={5} lg={4}>
               <Typography component='h6'>Budget</Typography>
               <Typography component='span'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget)}</Typography>
               <Typography component='h6'>Revenue</Typography>
               <Typography component='span'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue)}</Typography>
               <Typography component='h6'>Keywords</Typography>
               <Box component='div' >{movie.keywords.split(',').map(keyword=><span key={keyword}>{keyword}</span>)}</Box>   
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
                     <Paper component='div' elevation={3} >
                        <Typography component='h5'>{item.character}</Typography>
                        <Typography component='h6'>{item.name}</Typography>
                        
                     </Paper>
                  
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
                     <Paper component='div' elevation={3}>
                        <Typography component='h5'>{item.job}</Typography>
                        <Typography component='h6'>{item.name}</Typography>
                     </Paper>
                  
                  </ImageListItem>
               ))}
            {children}
            </ImageList>
         </Grid>
         <Grid item  xs={12} md={12} lg={12}>
            <Box component='div' className='review-title-box'>
               <Typography component='h5' variant='h5'>User Reviews</Typography>
               {reviews.filter(rev=>rev.movieid===movieid).length>0?
               <Link to={`/movies/${movieid}/addreview`} style={{textShadow:'1px 1px 1px orange'}}>Edit your review</Link>
               :
               <Link to={`/movies/${movieid}/addreview`} style={{textShadow:'1px 1px 1px orange'}}>Add a review</Link>
               }
            </Box>
            <Divider flexItem/>
            {reviewsList && reviewsList.length>0?
               <Box component='div' className='review-reviews-box'>
                  {reviewsList.map(reviewItem=>
                  <MovieReview key={reviewItem.reviewid} review={reviewItem}/>
                  )}
               </Box>
               :
               <Box component='div' sx={{display:'flex',justifyContent:'center',alignItems:'center',p:3,fontStyle:'italic'}}>
                  No reviews have been added for this movie
               </Box>}

            {reviewsList && reviewsList.length>0?
            <Box component='div' sx={{display:'flex',justifyContent:'center',alignItems:'center',p:2}}>
               <Link to={`/movies/${movieid}/reviews/all`} style={{textShadow:'1px 1px 1px orange'}}>Show all reviews</Link>
            </Box>:<></>}
         </Grid>

         <Grid item  xs={12} md={12} lg={12}>
            <Box component='div' className='post-title-box'>
               <Typography component='h5' variant='h5'>Forum Discussions</Typography>
               <Link to={`/movies/${movieid}/addpost`} sx={{textShadow:'1px 1px 1px orange'}}>Start a discussion</Link>
            </Box>
            <Divider flexItem/>
            {postsList && postsList.length>0?
               <Box component='div' className='post-posts-box'>
                  {postsList.map(postItem=>
                     <PostTitle key={postItem.postid} post={postItem}/>
                  )} 
               </Box>
               :
               <Box component='div' sx={{display:'flex',justifyContent:'center',alignItems:'center',p:3,fontStyle:'italic'}}>
                  No posts have been added for this movie
               </Box>}
            
            {postsList && postsList.length>0?   
            <Box component='div' sx={{display:'flex',justifyContent:'center',alignItems:'center',p:2}}>
               <Link to={`/movies/${movieid}/posts/all`} style={{textShadow:'1px 1px 1px orange'}}>Show all forum discussions related to this movie</Link>
            </Box>:<></>}
         </Grid>
      </Grid>
   </Box>

)};

export default Movie;