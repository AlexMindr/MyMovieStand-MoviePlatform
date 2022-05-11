import React from 'react'
import './profilefav.css'
import { Box,Typography,Divider } from '@mui/material'

const ProfileFav = ({movies}) => {
  
  return (
    <Box className='profile-fav-div'>
      <Typography component='h4' variant='h5'>Favourite movies</Typography>
      <Divider flexItem/>
      <Box className='profile-fav-movies'>
          {movies? movies.map(movie=>
            <div key={movie.movieid}>{movie.title}</div>
            ):
            <div className='movies-null'>No movies added to favourites</div>}
      </Box>
    </Box>
  )
  
}

export default ProfileFav