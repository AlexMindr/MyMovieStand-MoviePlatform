import React,{useState} from 'react'
import './posttitle.css'
import {Box,Divider,Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'

const PostTitle = ({post}) => {
  return (
    <Box className='Box-container-posttitle'>
        <Box className='Box-posttitle-left'>
            <Link to={`/movies/${post.movieid}/posts/post/${post.postid}`}>
            <Typography className='posttitle-title' variant='h5' component='h4'>
              {post.title.length>50?post.title.substring(0,50)+'...':post.title}
            </Typography>
            </Link>
            <Typography className='posttitle-user' variant='h6' component='h5'>
              by &nbsp;
              {post.User.username.length>20?<Link to={`/profile/${post.User.username}`}>{post.User.username.substring(0,20)}</Link>
              :
              <Link to={`/profile/${post.User.username}`}>{post.User.username}</Link>}
            </Typography>
            <Typography className='posttitle-date' variant='h6' component='h5'>
              {moment(post.createdAt).format("Do MM YYYY, HH:mm")}
            </Typography>
        </Box>
        <Box className='Box-posttitle-comms'>
            {post.commentCount} replies
        </Box>
    </Box>
  )
}

export default PostTitle