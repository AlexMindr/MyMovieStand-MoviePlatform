import React,{useState,useEffect} from 'react'
import './editfavourites.css'
import {useSelector} from 'react-redux'
import {getFavourites} from '../../api/index'
import { EditFav } from '../../components'
import { StyledEngineProvider,Container,Box,Typography,Grid,Divider } from '@mui/material'

const Editfavourites = () => {
    const [favourites,setFavourites]=useState(null)
    const {user} = useSelector(state=>state.user)

    useEffect(() => {
    
        async function getFavData(){
           const res= await getFavourites()
           const {favourites}=res.data;
           setFavourites(favourites);
          }
        getFavData();
    },[]);

  return (
    <StyledEngineProvider injectFirst>        
        <Container component="div"  className='editfav-container'>
         
         <Typography component="h3" variant='h4'>Edit your favourite movies</Typography>
         <Divider flexItem/>
         <Box component='div' className='editfav-favorites'>
            {favourites && <EditFav favourites={favourites}/>}
         </Box>
         
        </Container>
  </StyledEngineProvider>
  )
}

export default Editfavourites