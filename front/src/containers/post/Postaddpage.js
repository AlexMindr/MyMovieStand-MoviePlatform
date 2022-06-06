import React,{useEffect,useState} from 'react'
import './postaddpage.css'
import {Container,StyledEngineProvider} from '@mui/material'
import {PostAdd} from '../../components'
import { useParams } from 'react-router-dom'
import { getMovie } from '../../api'

const Postaddpage = () => {
  
    const {id}=useParams()
    const [movie,setMovie]=useState(null)
    const [err,setErr]=useState(null)
    
    useEffect(() => {

        async function getMoviebck(){
           const res= await getMovie(parseInt(id));
           if(res.data)
           setMovie(res.data);
           else
           //poate navigate in loc de seterr
           setErr("Movie doesn't exist!")  
        }
        getMoviebck()    
              
    },[id]);

    return (
    <StyledEngineProvider injectFirst>
      <Container component='div' className='container-postadd'>    
        
          {movie && err===null?<PostAdd movieid={movie.movieid} title={movie.title}/>
          :
          <div>{err}</div>}
      </Container>
    </StyledEngineProvider>
  )
}

export default Postaddpage