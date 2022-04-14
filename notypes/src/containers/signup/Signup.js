import React from 'react'
import './signup.css'
import { Typography, Container,Box,Button } from '@mui/material'
import {SignupForm} from '../../components'
import { StyledEngineProvider } from '@mui/material/styles';
import { useNavigate,Link } from 'react-router-dom'



const Signup= () => {
    
    return (
      <StyledEngineProvider injectFirst>        
          <Container component="div"  className='signup-container'>

               <Typography component="h3" variant='h4'>Sign up for an account</Typography>
               <Box component='div' className='signup-p'>
                  <Typography component='p' >
                    Signing up for an account is free and easy. Fill out the form below to get started. 
                  </Typography>
                  <Typography component='p' className='signup-login-p' >
                     If you already have an account you can login by  
                    <Link to='/login' className='signup-login' >
                        &nbsp;clicking here
                    </Link>.
                  </Typography>
               </Box>
               <SignupForm/>
               
         </Container>
      </StyledEngineProvider>
    )
 }

export default Signup