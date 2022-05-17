import React,{useState,useEffect} from 'react'
import './editfavourites.css'
import {useSelector} from 'react-redux'

import { EditFav } from '../../components'
import { StyledEngineProvider,Container,Box,Typography,Grid,Divider } from '@mui/material'

const Editfavourites = () => {
    
  return (
    <StyledEngineProvider injectFirst>        
        <Container component="div"  className='editfav-container'>
         
         <Typography component="h3" variant='h4'>Edit your favourite movies</Typography>
         <Divider flexItem/>
         <Box component='div' className='editfav-favorites'>
            {/* {favourites && watchlist  && */}
             <EditFav 
              //favourites={favourites} watchlist={watchlist} 
              // setFavourites={setFavourites} setWatchlist={setWatchlist}
              />
         </Box>
         
        </Container>
  </StyledEngineProvider>
  )
}

export default Editfavourites