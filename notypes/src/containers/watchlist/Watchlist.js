import React,{useEffect,useState} from 'react'
import { getWatchlist } from '../../api'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'

export const Watchlist = () => {
  const [watchlist,setWatchlist]=useState(null)
  const {username}=useParams()

  useEffect(() => {
    
    async function getData(){
       const res= await getWatchlist(username);
       setWatchlist(res.data.movies);
       }
    
    getData();
  },[username]);


  return (

    <Container component='div'>
        {watchlist && watchlist.map((item)=>item)}
    </Container>
  )
}
