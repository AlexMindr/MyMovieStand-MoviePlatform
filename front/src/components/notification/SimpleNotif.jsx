import React,{useState} from 'react'
import './simplenotification.css'
import { Box, } from '@mui/material'
import moment from 'moment'
import { actionUpdateNotif } from '../../store/notificationSlice';
import { useDispatch } from 'react-redux';

const SimpleNotif = ({notification}) => {
  const [notif,setNotif]=useState(notification)
  const dispatch=useDispatch()

  

  const handleUpdate=()=>{
    dispatch(actionUpdateNotif(notif.notificationid))
    .then()
  }


    return (
    <Box  onClick={handleUpdate} className='simplenotif-box' >
      <Box className='simplenotif-date'>{moment(notif.createdAt).startOf('day').fromNow()}</Box>
      <Box  className='simplenotif-content'>{notif.content}</Box>
    </Box>
  )
}



export default SimpleNotif