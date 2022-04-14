import React from 'react'
import './login.css'
import { Typography, Container,Box,Button } from '@mui/material'
import {LoginForm} from '../../components'
import { StyledEngineProvider } from '@mui/material/styles';
import { useNavigate,Link } from 'react-router-dom'

// <Box component='div' justifyContent="flex-end">
//                       <Link to='/signup' >
//                          <Button className='login-signup'>
//                            Don't have an account? Sign Up
//                         </Button>
//                       </Link>
//                 </Box>

const Login= () => {
    
    return (
      <StyledEngineProvider injectFirst>        
          <Container component="div"  className='login-container'>

               <Typography component="h3" variant='h4'>Login to your account</Typography>
               <Box component='div' className='login-p'>
                  <Typography component='p' variant='p'>
                     If you wish to create a personal watchlist, rate movies, write reviews and discuss on our forum, you will need to login to 
                     your personal account. If you don't have an account you can sign up for free by 
                     <Link to='/signup' className='login-signup' >
                     &nbsp;clicking here
                      </Link>.
                  </Typography>
               </Box>
               <LoginForm/>
               
         </Container>
      </StyledEngineProvider>
    )
 }

export default Login