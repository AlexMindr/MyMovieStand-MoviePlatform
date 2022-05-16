import React,{useState,useEffect} from 'react'
import './editfavourites.css'
import {useSelector} from 'react-redux'
import {getFavourites} from '../../api/index'
import { EditFav } from '../../components'
import { StyledEngineProvider,Container,Box,Typography,Grid,Divider } from '@mui/material'

const Editfavourites = () => {
    const [favourites,setFavourites]=useState(null)
    const [watchlist,setWatchlist]=useState(null)
    const {user} = useSelector(state=>state.user)


    useEffect(() => {
    
        async function getFavData(){
           const res= await getFavourites()
           const {favourites,watchlist}=res.data;
           setFavourites(favourites);
           setWatchlist(watchlist);
          }
        getFavData();
    },[]);

  return (
    <StyledEngineProvider injectFirst>        
        <Container component="div"  className='editfav-container'>
         
         <Typography component="h3" variant='h4'>Edit your favourite movies</Typography>
         <Divider flexItem/>
         <Box component='div' className='editfav-favorites'>
            {favourites && watchlist  && <EditFav favourites={favourites} watchlist={watchlist}/>}
         </Box>
         
        </Container>
  </StyledEngineProvider>
  )
}

export default Editfavourites