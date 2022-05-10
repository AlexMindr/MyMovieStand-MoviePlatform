import React from 'react'
import './profilewatchlist.css'
import { Box, Typography,CircularProgress,Divider } from '@mui/material'


const ProfileWatchlist = ({status}) => {
   

    if(status)
    return (
    <Box className='profile-status-div'>
        <Typography component='h4' variant='h5'>Statistics</Typography>
        <Divider/>
         
         <div className='profile-status-list'>  
            <ul>
                <li key={'completed'} className='profile-status-li-completed'>
                    <span>Completed &nbsp;&nbsp;</span>
                    <span>{status.completed}</span>
                </li>
                <li key={'watching'} className='profile-status-li-watching'>
                    <span>Watching&nbsp;&nbsp;</span>
                    <span>{status.watching}</span>
                </li>
                <li key={'plantowatch'}className='profile-status-li-plantowatch'>
                    <span>Plan to watch&nbsp;&nbsp;</span>
                    <span>{status.plantowatch}</span>
                </li>
                <li key={'dropped'}className='profile-status-li-dropped'>
                    <span>Dropped&nbsp;&nbsp;</span>
                    <span>{status.dropped}</span>
                </li>
                <li key={'onhold'} className='profile-status-li-onhold'>
                    <span>On-hold&nbsp;&nbsp;</span>
                    <span>{status.onhold}</span>
                </li>
                <li key={'total'} className='profile-status-li-total'>
                    <span>Total movies&nbsp;&nbsp;</span>
                    <span>{status.totalStatus}</span>
                </li>
            </ul>
          </div>
        
    </Box>
    )
   else return<></>
}

export default ProfileWatchlist