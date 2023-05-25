import React,{useState} from 'react'
import './notification.css'
import { Box,IconButton } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment'
import { actionDeleteNotif, actionUpdateNotif } from '../../store/notificationSlice';
import { useDispatch } from 'react-redux';

const Notification = ({notification,setRefresh}) => {
  const [notif,setNotif]=useState(notification)
  const dispatch=useDispatch()

  const handleDelete=()=>{
    dispatch(actionDeleteNotif(notif.notificationid))
    .then(res=>setRefresh(true))
  }

  const handleUpdate=()=>{
    dispatch(actionUpdateNotif(notif.notificationid))
    .then(res=>setRefresh(true))
  }


    return (
    <Box  className='notif-box' sx={notif.read?{backgroundColor:'white'}:{backgroundColor:'rgb(144, 255, 216)'}}>
      <Box className='notif-header'>
        <Box className='notif-date'>{moment(notif.createdAt).startOf('day').fromNow()}</Box>
        <IconButton onClick={handleDelete} className='notif-delete'><HighlightOffIcon sx={{color:'red',fontSize:'0.9rem'}}/></IconButton>
      </Box>  
      <Box onClick={handleUpdate} className='notif-content'>{notif.content}</Box>
    </Box>
  )
}

export default Notification