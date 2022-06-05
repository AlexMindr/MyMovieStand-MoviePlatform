import React,{useEffect,useState} from 'react'
import './postcontent.css'
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'
import { useSelector } from 'react-redux';
import { stringAvatar } from '../../auxcomponents/avatar/Avatarfct';
import { Link } from 'react-router-dom';
import { Box,Typography,Avatar,Button,ClickAwayListener } from '@mui/material';
import moment from 'moment'
import { deletePostUser } from '../../api';


const styles = {
  position: 'absolute',
  top: 28,
  right: 0,
  //left: 0,
  zIndex: 10,
  border: '1px solid',
  p: 1,
  bgcolor: 'pink',
  width:250,
};


const PostContent = ({postContent,setRefresh}) => {
  const {user}=useSelector(state=>state.user)
  const [open, setOpen] = useState(false);

  const handleDeletePost = async () =>{
    deletePostUser(postContent)
    .then(res=>{
      //if(res.data.message==="Success")
        setRefresh(true)
    })
    .catch(e=>console.log(e))
    
  }
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  if(postContent)
  return (
    <Box>
      <Typography variant='h5' component='h4' className='postcontent-title'>
        {postContent.title}
      </Typography>   
      <Box className='Box-postcontent'>
        
        <Box className='Box-postcontent-header'>
            <span>{moment(postContent.createdAt).format("Do MM YYYY, HH:mm")}</span>
            {user.username===postContent.User.username?
            <div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box sx={{ position: 'relative' }}>
                <Button variant='text' sx={{color:'red'}} onClick={handleClick}>
                  Delete post
                </Button>
              {open ? (
              <Box sx={styles}>
                <span>Are you sure you want to delete this post?</span>
                <Button onClick={handleDeletePost}>Yes</Button>
                <Button onClick={handleClickAway}>No</Button>
              </Box>
              ) : null}
              </Box>
            </ClickAwayListener>
            </div>
            :
            <></>}
            
        </Box>
        <Box className='Box-postcontent-content'>
          <Box className='Box-postcontent-left'>
            <Avatar  {...stringAvatar(postContent.User.fullname)} aria-label="fullname"/>
            {/* <Box>{postContent.User.username}</Box> */}
            <Link to={`/profile/${postContent.User.username}`}>{postContent.User.username}</Link>
          </Box>
          <Box className='Box-postcontent-right'>
            <DraftDisplay field={postContent.content} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
  else 
  return (
    <div>Loading</div>
  )
}

export default PostContent