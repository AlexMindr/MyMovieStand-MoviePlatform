import React,{useEffect,useState} from 'react'
import './userreviews.css'
import {useParams} from 'react-router-dom'
import { getUserReviews } from '../../api'
import {Grid,CircularProgress,Pagination,Box,Typography,Container,StyledEngineProvider,Paper,Divider} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MovieReview } from '../../components'

const Userreviews = () => {

    const [reviewList,setReviewsList]=useState(null)
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState()
    const {username} = useParams()
  
    const pageChange = (event, value) => {
      setPage(value);
    };
  
     
  
    useEffect(() => {
     
      async function getData(){ 
         const res= await getUserReviews(parseInt(id),1,10);
         setReviewsList(res.data.reviews);
         setTotalPages(res.data.totalPages);   
      }
      
      getData();
     
   },[id]);
  
   
  return (
    <StyledEngineProvider injectFirst>
    <Container className='userreviews-container'>
      <Paper elevation={5}>
        <Typography variant='h4' component='h3'>
          You are viewing all reviews made by you:
        </Typography>
        <Divider flexItem sx={{m:1}}/>
        {reviewList===null?
            <div className='loading-userreviews'>
                <CircularProgress />
            </div>
            :
            reviewList.length>=1?
            <Box sx={{ flexGrow: 1 }} className='userreviews-box'>
              <Grid container rowGap={1} columnSpacing={'10px'}>
                {reviewList.map((review) =>
                    <Grid item xs={12}  key={review.reviewid} className='userreviews-review'> 
                    <Link to={`/movies/${review.movieid}`}><Typography variant='h5' component='h4'>{review.Movie.title}</Typography></Link>
                    <Link to={`/movies/${review.movieid}/addreview`}>Edit your review</Link>
                      <MovieReview review={review}/>  
                    </Grid>
                )}
              </Grid>
            </Box>
            :
            <div className='loading-userreviews'>
                <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>No reviews have been added for this movie</Typography>    
            </div>
        }
               
        {reviewList!==null&&reviewList.length>=1?
        <div className='userreviews-pagination'>
            <Pagination count={totalPages} page={page?page:1} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={pageChange}/>
        </div>:
        <></>}
      
      </Paper>
    </Container>
  </StyledEngineProvider>
  )
}

export default Userreviews