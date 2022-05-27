import React,{useEffect,useState} from 'react'
import './postcontent.css'
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'
import { useSelector } from 'react-redux';
import { stringAvatar } from '../../auxcomponents/avatar/Avatarfct';
import { Link } from 'react-router-dom';
import { Box,Typography,Avatar } from '@mui/material';
import moment from 'moment'


const PostContent = ({postContent}) => {
  if(postContent)
  return (
    <Box>
      <Typography variant='h5' component='h4' className='postcontent-title'>
        {postContent.title}
      </Typography>   
      <Box className='Box-postcontent'>
        
        <Box className='Box-postcontent-header'>
            {moment(postContent.createdAt).format("Do MM YYYY, HH:mm")}
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