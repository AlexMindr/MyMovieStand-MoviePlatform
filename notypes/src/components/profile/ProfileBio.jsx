import React from 'react'
import "./profilebio.css"
import { Box,Typography,Divider } from '@mui/material'
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'

const trythis={
  "blocks": [
      {
          "key": "1bqo4",
          "text": "dabdsdadbc",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
      }
  ],
  "entityMap": {}
}

const ProfileBio = ({bio}) => {

  return (
    <Box className='profile-bio-div'>
      <Typography component='h4' variant='h5'>About</Typography>
      <Divider flexItem/>
      <Box className='profile-bio-text'>
      {bio?
      <DraftDisplay field={bio} />
      :
      <div className='bio-null'>No biography has been added</div>
      }
      </Box>
    </Box>
  )
}

export default ProfileBio