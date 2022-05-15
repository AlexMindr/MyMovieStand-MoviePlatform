import React,{useState,useEffect} from 'react';
import './moviefavlist.css'
import {Card,CardHeader,CardMedia,CardContent,IconButton,Typography,CardActions} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StarIcon from '@mui/icons-material/Star';

const MovieFavList = ({posterPath,title,movieid,rating,status,actions, children }) => {
  return (
    <Card sx={{ maxWidth: 300, minWidth:150 }} className='moviefavlist-card'>
        <CardHeader className='moviefavlist-header'
        title={title}
        />
        <CardMedia className='moviefavlist-image'
        component="img"
        image={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
        />
        <CardContent className='moviefavlist-content'>
        <Typography variant="body2" color="text.secondary" component='span'>
            <span>Rated: &nbsp; {rating}</span>&nbsp;<StarIcon sx={{verticalAlign:'bottom',color:'gold'}}/>
        </Typography>
        <Typography variant="body2" color="text.secondary" component='span'>
            Status: {status}
        </Typography>
        </CardContent>
        {actions?<CardActions disableSpacing className='moviefavlist-actions'>
        <IconButton aria-label="add to favorites">
            <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="remove from favorites">
            <RemoveCircleIcon />
        </IconButton>
        </CardActions>:<></>}
</Card>
  )
}

export default MovieFavList