import React from 'react'
import './profileavatar.css'
import {stringAvatar} from '../../auxcomponents/avatar/Avatarfct'
import { Avatar,Box,Button,CircularProgress} from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ProfileAvatar = ({profile,joined}) => {
  
if(profile)
return (
     
      <Box className='profile-avatar-div' component='div'>
    
        <Avatar {...stringAvatar(profile.fullname)} className='profile-avatar' />
        <div className='profile-avatar-info'>
          <ul>
            <li>
              <span className='profile-avatar-list-title'>Name </span>
              <span className='profile-avatar-list-content'>{profile.fullname}</span>
            </li>
            <li>
              <span className='profile-avatar-list-title'>Gender</span>
              <span className='profile-avatar-list-content'>{profile.gender?profile.gender:'-'}</span>
            </li>
            <li>
              <span className='profile-avatar-list-title'>Location </span>
              <span className='profile-avatar-list-content'>{profile.location?profile.location:'-'}</span>
            </li>
            <li>
              <span className='profile-avatar-list-title'>Birthday </span>
              <span className='profile-avatar-list-content'>{profile.dateofbirth?profile.dateofbirth:'-'}</span>
            </li>
            <li>
              <span className='profile-avatar-list-title'>Joined </span>
              <span className='profile-avatar-list-content'>{ moment(joined).format("MMM Do YY")}</span>
            </li>
          </ul>
        </div>
        <div className='profile-avatar-redirect'>
        <Link to={`/watchlist/${profile.username}`}>
          <Button variant='contained'>
            Watchlist
          </Button>
        </Link>
        </div>
      </Box>
      
      
      )
  return (<div><CircularProgress/></div>)
}

export default ProfileAvatar