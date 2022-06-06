import React,{useEffect,useState} from 'react'
import './postpage.css'
import { getPostContent,getPostComments,getMovie } from '../../api'
import {Button,Grid,CircularProgress,Pagination,Box,Typography,Container,StyledEngineProvider,Paper,Divider} from '@mui/material'
import { Link,useParams,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PostContent,PostComm,CommAdd } from '../../components'


const Postpage = () => {
  const [postComments,setPostComments]=useState(null)
  const [postContent,setPostContent]=useState(null)
  const [page, setPage] = useState(1);
  const [totalPages,setTotalPages]=useState()
  const [addComm,setAddComm] = useState(false)
  const [movie,setMovie]=useState(null)
  const [err,setErr]=useState(null)
  const [refreshContent,setRefreshContent]=useState(false)
  const [refreshComm,setRefreshComm]=useState(false)
  const {movieid,postid} = useParams()
  const {user} = useSelector(state=>state.user)
  const location =useLocation()
  
  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleAddComm = (e) =>{
    setAddComm(true)
  }
  useEffect(() => {
    async function getMoviebck(){
      const res= await getMovie(parseInt(movieid));
      if(res.data)
        setMovie(res.data);
      else
        setErr("Movie doesn't exist!")  
   }
    async function getComments(){ 
       const res= await getPostComments(parseInt(postid),1,8);
       setPostComments(res.data.comments);
       setTotalPages(res.data.totalPages);   
    }
    async function getContent(){ 
      const res= await getPostContent(parseInt(postid));
      if(res.data)
        setPostContent(res.data);   
      else
        setErr("Post doesn't exist!")
      }
    getMoviebck()
    //if(err===null){
      getContent()
      getComments()
    //}    
   
 },[movieid,postid]);


useEffect(()=>{
  async function getComments(){ 
    const res= await getPostComments(parseInt(postid),1,8);
    setPostComments(res.data.comments);
    setTotalPages(res.data.totalPages);   
 }
 if(refreshComm===true){
  setPostComments()
  setRefreshComm(false)
   getComments()
 }
},[postid,refreshComm])


useEffect(()=>{
  async function getContent(){ 
    const res= await getPostContent(parseInt(postid));
    if(res.data)
      setPostContent(res.data);   
    else
      setErr("Post doesn't exist!")
    }
 if(refreshContent===true){
   setPostContent()
   setRefreshContent(false)
   getContent()
 }
},[postid,refreshContent])

  return (
    <StyledEngineProvider injectFirst>
    <Container className='postpage-container'>
      <Paper elevation={5}>
      {movie && err===null?
        <>
        <Typography variant='h4' component='h3' sx={{p:'10px 5px 5px 5px',}}>
          <span>Discussion about the movie :</span>
          <Link to={`/movies/${movie.movieid}`}>{movie.title}</Link>
        </Typography>
        <Divider flexItem sx={{m:1}}/>
        
        <PostContent postContent={postContent} setRefresh={setRefreshContent}/>
        <Box className='postpage-addcomment'>
          {user?
          <>
            {addComm===false?<Button onClick={handleAddComm} variant='outlined'>Add a comment</Button>
            :
            <CommAdd postid={postid} addState={setAddComm} setRefreshComm={setRefreshComm}/>
            }
          </>:
          <Link to={'/login'} state={{ from: location }}>Login to add comment</Link>
          }
        </Box>
        <Box className='postpage-comments'>
        {postComments===null?
            <div className='loading-postpage'>
                <CircularProgress />
            </div>
            :
            postComments && postComments.length>=1?
            <Box sx={{ flexGrow: 1 }} className='postpage-box'>
              <Grid container rowGap={2} columnSpacing={'10px'}>
                {postComments.map((post) =>
                    <Grid item xs={12}  key={post.ucid} className='postpage-postcomm'> 
                      <PostComm postComment={post} setRefreshComm={setRefreshComm}/>  
                    </Grid>
                )}
              </Grid>
            </Box>
            :
            <div className='loading-postpage'>
                <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>No comments have been added</Typography>    
            </div>
          }
        </Box>
        </>
        :
        <div className='loading-postpage'>{err}</div>
        }      
        {postComments&&postComments.length>=1?
        <div className='postpage-pagination'>
            <Pagination count={totalPages} page={page?page:1} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={pageChange}/>
        </div>:
        <></>}
      
      </Paper>
    </Container>
  </StyledEngineProvider>
  )
}

export default Postpage