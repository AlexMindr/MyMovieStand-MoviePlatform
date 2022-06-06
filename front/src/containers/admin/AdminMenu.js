import React from 'react'
import { Link } from 'react-router-dom'
import './adminmenu.css'
import {Box,Container,Typography,Paper,Divider} from '@mui/material'

const AdminMenu = () => {
  return (
    <Container >
        <Paper elevation={2} sx={{minHeight:'70vh'}}>
            <Typography component='h3' variant='h4'>
                Admin Dashboard
            </Typography>
            <Divider flexItem/>
            <Box className='Box-admin-menu'>
                <Link to={'/admin/user'}>
                    Users
                </Link>
                <Link to={'/admin/movie'}>
                    Movies
                </Link>
                <Link to={'/admin/forum'}>
                    Forum posts and reviews
                </Link>
            </Box>
        </Paper>
    </Container>
  )
}

export default AdminMenu