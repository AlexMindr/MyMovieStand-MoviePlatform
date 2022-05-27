import React,{useEffect,useState} from 'react'
import './movieposts.css'
import {useParams} from 'react-router-dom'
import { getMoviePosts,getMovie } from '../../api'
import {Grid,CircularProgress,Pagination,Box,Typography,Container,StyledEngineProvider,Paper,Divider} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PostTitle } from '../../components'

const Movieposts = () => {
  const [postList,setPostsList]=useState(null)
  const [page, setPage] = useState(1);
  const [totalPages,setTotalPages]=useState()
  const [movie,setMovie]=useState(null)
  const [err,setErr]=useState(null)
  const {id} = useParams()

  const pageChange = (event, value) => {
    setPage(value);
  };

   

  useEffect(() => {
    async function getMoviebck(){
      const res= await getMovie(parseInt(id));
      if(res.data)
      setMovie(res.data);
      else
      setErr("Movie doesn't exist!")  
   }
    async function getData(){ 
       const res= await getMoviePosts(parseInt(id),1,10);
       setPostsList(res.data.posts);
       setTotalPages(res.data.totalPages);   
    }
    
    getData();
    getMoviebck()    
   
 },[id]);

  return (
    <StyledEngineProvider injectFirst>
    <Container className='allposts-container'>
      <Paper elevation={5}>
      {movie && err===null?
        <>
        <Typography variant='h4' component='h3' sx={{p:'10px 5px 5px 5px',}}>
          You are viewing all discussions about the movie:
        </Typography>
        <Link to={`/movies/${movie.movieid}`}><Typography variant='h5' component='h4'>{movie.title}</Typography></Link>               
           <Link to={`/movies/${movie.movieid}/addpost`}>Start a discussion</Link>
        <Divider flexItem sx={{m:1}}/>
        {postList===null?
            <div className='loading-allposts'>
                <CircularProgress />
            </div>
            :
            postList.length>=1?
            <Box sx={{ flexGrow: 1 }} className='allposts-box'>
              <Grid container rowGap={1} columnSpacing={'10px'}>
                {postList.map((post) =>
                    <Grid item xs={12}  key={post.postid} className='allposts-post'> 
                      <PostTitle post={post}/>  
                    </Grid>
                )}
              </Grid>
            </Box>
            :
            <div className='loading-allposts'>
                <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>No posts have been added for this movie</Typography>    
            </div>
          }
        </>
        :
        <div className='loading-allposts'>{err}</div>
        }      
        {postList&&postList.length>=1?
        <div className='allposts-pagination'>
            <Pagination count={totalPages} page={page?page:1} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={pageChange}/>
        </div>:
        <></>}
      
      </Paper>
    </Container>
  </StyledEngineProvider>
  )
}

export default Movieposts