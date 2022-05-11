import React from 'react'
import "./profilebio.css"
import { Box,Typography,Divider } from '@mui/material'

const ProfileBio = ({bio}) => {

  return (
    <Box className='profile-bio-div'>
      <Typography component='h4' variant='h5'>About</Typography>
      <Divider flexItem/>
      <Box className='profile-bio-text'>
      {bio?
      <p>bio</p>
      :
      <div className='bio-null'>No biography has been added</div>
      }
      </Box>
    </Box>
  )
}

export default ProfileBio