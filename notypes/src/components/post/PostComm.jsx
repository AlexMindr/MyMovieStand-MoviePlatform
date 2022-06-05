import React,{useEffect,useState} from 'react'
import './postcomment.css'
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'
import { useSelector } from 'react-redux';
import { stringAvatar } from '../../auxcomponents/avatar/Avatarfct';
import { Link } from 'react-router-dom';
import { Box,Avatar } from '@mui/material';
import moment from 'moment'

const PostComm = ({postComment}) => {
  const {user}=useSelector(state=>state.user)


  if(postComment)
  return (<>
    {user && user.role==='admin'?
    <Box sx={{p:1,color:'red',fontSize:'1.2rem'}}>
    Comment id: {postComment.ucid}
    </Box>:<></>}
    <Box className='Box-postcomment'>
        
        <Box className='Box-postcomment-header'>
            {moment(postComment.createdAt).format("Do MM YYYY, HH:mm")}
        </Box>
        <Box className='Box-postcomment-comment'>
          <Box className='Box-postcomment-left'>
            <Avatar  {...stringAvatar(postComment.User.fullname)} aria-label="fullname"/>
            {/* <Box>{postComment.User.username}</Box> */}
            <Link to={`/profile/${postComment.User.username}`}>{postComment.User.username}</Link>
          </Box>
          <Box className='Box-postcomment-right'>
            <DraftDisplay field={postComment.comment_content} />
          </Box>
        </Box>
    </Box>
  </>
  )
  else 
  return (
    <div>Loading</div>
  )
}

export default PostComm