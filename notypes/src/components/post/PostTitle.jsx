import React,{useState} from 'react'
import './posttitle.css'
import {Box,Divider,Typography} from '@mui/material'
import { Link } from 'react-router-dom'

const PostTitle = ({post}) => {
  return (
    <Box className='Box-container-posttitle'>
        <Box className='Box-posttitle-title'>
            {/* <Link */}
            <Typography variant='h5' component='h4'>{post.title}</Typography>
            <Typography variant='h6' component='h5'>{post.User.username} - {post.createdAt}</Typography>
        </Box>
        <Box className='Box-posttitle-comms'>
            {post.commentCount} replies
        </Box>
    </Box>
  )
}

export default PostTitle