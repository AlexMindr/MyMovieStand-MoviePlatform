import React from 'react'
import './newstitle.css'
import {Box,Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import moment from 'moment'


const NewsTitle = ({news}) => {
  return (
    
    <Box className='Box-container-newstitle'>
        <Box className='Box-newstitle-left'>
            <Link to={`/movies/${news.movieid}/newss/news/${news.newsid}`}>
            <Typography className='newstitle-title' variant='h5' component='h4'>
              {news.title.length>50?news.title.substring(0,50)+'...':news.title}
            </Typography>
            </Link>
            {/* <Typography className='newstitle-user' variant='h6' component='h5'>
              by &nbsp;
              {news.User.username.length>20?<Link to={`/profile/${news.User.username}`}>{news.User.username.substring(0,20)}</Link>
              :
              <Link to={`/profile/${news.User.username}`}>{news.User.username}</Link>}
            </Typography> */}
            <Typography className='newstitle-date' variant='h6' component='h5'>
              {moment(news.createdAt).format("Do MM YYYY, HH:mm")}
            </Typography>
        </Box>
        <Box className='Box-newstitle-comms'>
            {news.commentCount} replies
        </Box>
    </Box>
  )
}

export default NewsTitle