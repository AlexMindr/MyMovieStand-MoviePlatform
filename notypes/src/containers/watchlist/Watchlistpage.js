import React,{useEffect,useState} from 'react'
import './watchlist.css'
import { getWatchlist } from '../../api'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import  StyledEngineProvider  from '@mui/material/StyledEngineProvider'
import { Watchlist } from '../../components'

const Watchlistpage = () => {
  const [watchlist,setWatchlist]=useState(null)
  const {username}=useParams()

  useEffect(() => {
    
    async function getData(){
       const res= await getWatchlist(username);
       setWatchlist(res.data.watchlist);
      }
    
    getData();
  },[username]);

  
  return (
  <StyledEngineProvider injectFirst>
    <Container component='div'>
      {watchlist===null?
      <div className='loading-watchlist'>
        <CircularProgress />
      </div>
      :
      <Watchlist watchlist={watchlist}/>
        
      }
    </Container>
  </StyledEngineProvider>
  )
}

export default Watchlistpage;