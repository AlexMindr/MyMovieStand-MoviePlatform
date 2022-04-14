import React from 'react'
import './moviepage.css'
import {Movie} from '../../components'
import { useParams } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles';
import Container from '@mui/material/Container'

const Moviepage = () => {
  const {id}=useParams()
  console.log(id);
  return (
    <>
    <StyledEngineProvider injectFirst>
      <Container component='div' className='container-movie'>    
  
        <Movie movieid={id}/>
      </Container>
    </StyledEngineProvider>
    </>
  )
}

export default Moviepage;