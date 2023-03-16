import React,{useEffect,useState} from 'react'
import './watchlist.css'
import { getWatchlist } from '../../api'
import  Paper  from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import  CircularProgress  from '@mui/material/CircularProgress'
import  StyledEngineProvider  from '@mui/material/StyledEngineProvider'
import { Watchlist } from '../../components'
import { useSelector } from 'react-redux'

const Watchlistpage = () => {
  const [watchlist,setWatchlist]=useState(null)
  const {username}=useParams()
  const {user} = useSelector(state=>state.user)
  const navigate= useNavigate()

  useEffect(() => {
    
    async function getData(){
       const res= await getWatchlist(username);
       if(res.data.message==="User doesn't exist")
       navigate('/error')
       else 
       setWatchlist(res.data.watchlist);
       
      }
    
    getData();
  },[username,navigate]);

  
  return (
  <StyledEngineProvider injectFirst>
    <Paper elevation={2}>
      {watchlist===null?
      <div className='loading-watchlist'>
        <CircularProgress />
      </div>
      :
      <>
      <Typography component="h2" variant="h3" className="Container-title">{user?user.username===username?'My':user.username+"'s":username+"'s"} watchlist</Typography>
      <Watchlist watchlist={watchlist} myProfile={user?user.username===username?true:false:false}/>
      </>
        
      }
    </Paper>
  </StyledEngineProvider>
  )
}

export default Watchlistpage;