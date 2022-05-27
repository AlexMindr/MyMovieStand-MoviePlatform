import React,{useEffect,useState} from 'react'
import './userposts.css'
import {useParams} from 'react-router-dom'
import { getUserPosts,getUserComments } from '../../api'
import {Grid,CircularProgress,Pagination,Box,Typography,Container,StyledEngineProvider,Paper,Divider} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PostComm,PostTitle } from '../../components'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Userposts = () => {
  
    const [postList,setPostList]=useState(null)
    const [pagePost, setPagePost] = useState(1);
    const [postTotalPages,setPostTotalPages]=useState()
    const [commList,setCommList]=useState(null)
    const [pageComm, setPageComm] = useState(1);
    const [commTotalPages,setCommTotalPages]=useState()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    const {username} = useParams()
    const {user} = useSelector(state=>state.user)

    const pageChangePost = (event, value) => {
      setPagePost(value);
    };
    const pageChangeComm = (event, value) => {
      setPageComm(value);
    };
     
  
    useEffect(() => {
     
      async function getPosts(){ 
         const res= await getUserPosts(username,1,5);
         setPostList(res.data.posts);
         setPostTotalPages(res.data.totalPages);   
      }
      async function getComms(){ 
        const res= await getUserComments(username,1,5);
        setCommList(res.data.posts);
        setCommTotalPages(res.data.totalPages);   
     }

      getComms();
      getPosts();
     
   },[username]);
  
  //console.log(commList.UserComments)
  return (
    <StyledEngineProvider injectFirst>
    <Container className='userposts-container'>
      <Paper elevation={5}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Posts" {...a11yProps(0)} />
              <Tab label="Comments" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            
          <Typography variant='h4' component='h3' sx={{p:'10px 5px 5px 5px',}}>
            You are viewing all forum posts made by {username===user.username?'you':username}:
          </Typography>
          <Divider flexItem sx={{m:1}}/>
          {postList===null?
              <div className='loading-userposts'>
                  <CircularProgress />
              </div>
              :
              postList && postList.length>=1?
              <Box sx={{ flexGrow: 1 }} className='userposts-box'>
                <Grid container rowGap={1} columnSpacing={'10px'}>
                  {postList.map((post) =>
                      <Grid item xs={12}  key={post.postid} className='userposts-post'> 
                        <Box component='div' className='userposts-post-title'>
                          <Typography variant='h5' component='h4'>Movie: &nbsp;<Link to={`/movies/${post.movieid}`}>{post.Movie.title}</Link></Typography>
                        </Box>
                        <PostTitle post={post}/>  
                      </Grid>
                  )}
                </Grid>
              </Box>
              :
              <div className='loading-userposts'>
                  <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>
                    No posts have been made</Typography>    
              </div>
          }
                
          {postList!==null&&postList.length>=1?
          <div className='userposts-pagination'>
              <Pagination count={postTotalPages} page={pagePost?pagePost:1} variant="outlined" shape="rounded" 
              showFirstButton showLastButton onChange={pageChangePost}/>
          </div>:
          <></>}
      
          </TabPanel>
          <TabPanel value={value} index={1}>
            
          <Typography variant='h4' component='h3' sx={{p:'10px 5px 5px 5px',}}>
            You are viewing all forum comments made by {username===user.username?'you':username}:
          </Typography>
          <Divider flexItem sx={{m:1}}/>
          {commList===null?
              <div className='loading-userposts'>
                  <CircularProgress />
              </div>
              :
              commList && commList.length>=1?
              <Box sx={{ flexGrow: 1 }} className='userposts-box'>
                <Grid container rowGap={1} columnSpacing={'10px'}>
                  {commList.map((post) =>
                      <Grid item xs={12}  key={post.postid} className='userposts-post'> 
                        <Box component='div' className='userposts-post-title'>
                          <Typography variant='h5' component='h4'>Movie: &nbsp;<Link to={`/movies/${post.movieid}`}>{post.Movie.title}</Link></Typography>
                        </Box>
                        <PostTitle post={post}/>
                        <Box sx={{ flexGrow: 1 }} className='userposts-box'>
                          <Grid container rowGap={1} columnSpacing={'10px'}>
                            {post.UserComments.map((comment) =>
                                <Grid item xs={12}  key={comment.ucid} className='userposts-post'> 
                                  <PostComm postComment={comment}/>  
                                </Grid>
                            )}
                          </Grid>
                        </Box>  
                      </Grid>
                  )}
                </Grid>
              </Box>
              :
              <div className='loading-userposts'>
                  <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>
                    No comments have been made
                  </Typography>    
              </div>
          }
                
          {postList!==null&&postList.length>=1?
          <div className='userposts-pagination'>
              <Pagination count={commTotalPages} page={pageComm?pageComm:1} variant="outlined" shape="rounded" 
              showFirstButton showLastButton onChange={pageChangeComm}/>
          </div>:
          <></>}
      

          </TabPanel>
        </Box>
      </Paper>
    </Container>
  </StyledEngineProvider>
  )
}

export default Userposts