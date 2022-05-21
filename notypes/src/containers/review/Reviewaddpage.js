import React,{useEffect,useState} from 'react'
import './reviewaddpage.css'
import {Container,StyledEngineProvider} from '@mui/material'
import {ReviewAdd} from '../../components'
import { useParams } from 'react-router-dom'
import { getMovie } from '../../api'

const Reviewaddpage = () => {
    const {id}=useParams()
    const [movie,setMovie]=useState(null)
    const [err,setErr]=useState(null)
    useEffect(() => {

        async function getMoviebck(){
           const res= await getMovie(parseInt(id));
           if(res.data)
           setMovie(res.data);
           else
           setErr("Movie doesn't exist!")  
        }
        getMoviebck()    
        
        
    },[id]);

return (
    <StyledEngineProvider injectFirst>
      <Container component='div' className='container-reviewadd'>    
        
          {movie && err===null?<ReviewAdd movieid={movie.movieid} title={movie.title} />
          :
          <div>{err}</div>}
      </Container>
    </StyledEngineProvider>
  )
}

export default Reviewaddpage