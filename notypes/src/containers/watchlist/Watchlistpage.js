import React,{useEffect,useState} from 'react'
import './watchlist.css'
import { getWatchlist } from '../../api'
import { Container,Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import  StyledEngineProvider  from '@mui/material/StyledEngineProvider'
import { Watchlist } from '../../components'
import { useSelector } from 'react-redux'

const Watchlistpage = () => {
  const [watchlist,setWatchlist]=useState(null)
  const {username}=useParams()
  const {user} = useSelector(state=>state.user)

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
      <Typography component='h3' variant='h4'>{user?user.username===username?'My':user.username+"'s":username+"'s"} watchlist</Typography>
      {watchlist===null?
      <div className='loading-watchlist'>
        <CircularProgress />
      </div>
      :
      <Watchlist watchlist={watchlist} myProfile={user?user.username===username?true:false:false}/>
        
      }
    </Container>
  </StyledEngineProvider>
  )
}

export default Watchlistpage;