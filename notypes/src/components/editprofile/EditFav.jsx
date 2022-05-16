import React from 'react'
import './editfav.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box,Grid,Typography,Divider } from '@mui/material'
import {MovieFavList} from '../'

const EditFav = ({watchlist,favourites}) => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
  
  const onFavClick = (movieid) => {
    console.log('add')
  }
  const onRemClick = (movieid) => {
    console.log('rem')
  }

  return (
    <Box sx={{flexGrow:1}} className='watchlistfav-edit-div'>
      <Typography component="h4" variant='h5' sx={{marginTop:3,marginBottom:1}}>Your watchlist</Typography>
      <Grid container rowGap={1} columnSpacing={'10px'} className='watchlistfav-edit-wl-grid'>
          {watchlist && watchlist.length>0? watchlist.map(wlItem=>
            <Grid item xs={6} md={4} lg={2} key={wlItem.movieid}>
              <MovieFavList title={wlItem.Movie.title} posterPath={wlItem.Movie.poster_path} status={wlItem.status} rating={wlItem.rating}
              movieid={wlItem.movieid} actions={true} favourites={wlItem.favourites} onFavClick={onFavClick} onRemClick={onRemClick}/>
            </Grid>
            ):
            <Grid item xs={12} className='watchlist-null'>No movies added to favourites</Grid>}
      </Grid>

      <Divider flexItem sx={{height:10, marginTop:5}}/>
      <Typography component="h4" variant='h5' sx={{marginTop:5,marginBottom:1}}>Your current favourites</Typography>
      
      <Grid container rowGap={1} columnSpacing={'10px'} className='watchlistfav-edit-fav-grid'>
          {favourites && favourites.length>0? favourites.map(favItem=>
            <Grid item xs={6} md={4} lg={2} key={favItem.movieid}>
              <MovieFavList title={favItem.Movie.title} posterPath={favItem.Movie.poster_path} status={favItem.status} rating={favItem.rating}
              movieid={favItem.movieid} actions={true} favourites={favItem.favourites}/>
            </Grid>
            ):
            <Grid item xs={12} className='favourites-null'>No movies added to favourites</Grid>}
      </Grid>
    </Box>
  )
}

export default EditFav