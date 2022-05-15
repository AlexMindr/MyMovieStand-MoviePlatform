import React from 'react'
import './editfav.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'


const EditFav = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()

  return (
    <Box sx={{flexGrow:1}}>

    </Box>
  )
}

export default EditFav