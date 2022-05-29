import React,{useState,useEffect} from 'react'
import './moviehomelist.css'
import { Box,Button } from '@mui/material'
import { Link} from 'react-router-dom'

const MovieHomeList = ({movie,index}) => {
    let borderColor=null
    let bgColor=null
  return (
    <Box className='Box-moviehomelist'>
        <Box className='moviehomelist-index'>
            {index+1}.
        </Box> 
        <Box className='moviehomelist-item'>
            <img className='moviehomelist-img' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
            <Box className='moviehomelist-title'>
                <Link to={`/movies/${movie.movieid}`}>{movie.title}</Link>
            </Box>
        </Box>
        <Box className='moviehomelist-status'> 
             <Button variant='outlined' sx={{minWidth:'55px',padding:'2px 5px',color:bgColor?'white':'black',fontWeight:'bold',textTransform:'none',
            border:borderColor?borderColor:'1px solid black', backgroundColor:bgColor?bgColor:'white'}}>status</Button>
        </Box>
    </Box>
)

}

export default MovieHomeList