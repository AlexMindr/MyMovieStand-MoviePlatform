import React,{useState,useEffect} from 'react'
import './notifications.css'
import { getNotificationPag } from '../../api'
import { useSelector } from 'react-redux'
import {Grid,CircularProgress,Pagination,Box,Typography,StyledEngineProvider,Paper,Divider} from '@mui/material'
import { Notification } from '../../components'

const Notifications = () => {
    const [notifications,setNotifications]=useState(null)
    const [totalPages,setTotalPages]=useState()
    const [page,setPage]=useState(1)
    const [refresh,setRefresh]=useState(false)
    const {user} = useSelector(state=>state.user)


    useEffect(()=>{
        async function getData(){
            const res = await getNotificationPag(page)
            setNotifications(res.data.notifications)
            setTotalPages(res.data.totalPages)
        }

        if(user)
            getData()
        
    },[user,page])

    useEffect(()=>{
      async function getData(){
          const res = await getNotificationPag(page)
          setNotifications(res.data.notifications)
          setTotalPages(res.data.totalPages)
      }

    if(refresh===true){
      setNotifications(null)
      setRefresh(false)
      getData()    
      }
    },[page,refresh])


    const pageChange = (event, value) => {
        setPage(value);
      };
  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2}>
      <Typography component="h2" variant="h3" className="Container-title">
          You are viewing all notifications
        </Typography>
        <Divider flexItem sx={{m:1}}/>
        {notifications===null?
            <div className='loading-notifications'>
                <CircularProgress />
            </div>
            :
            notifications.length>=1?
            <Box sx={{ flexGrow: 1 }} className='notifications-box'>
              <Grid container rowGap={1} columnSpacing={'10px'}>
                {notifications.map((notif) =>
                    <Grid item xs={12}  key={notif.notificationid} className='notifications-post'> 
                      <Notification notification={notif} setRefresh={setRefresh}/>  
                    </Grid>
                )}
              </Grid>
            </Box>
            :
            <div className='loading-notifications'>
                <Typography variant='h4' sx={{fontStyle:'oblique', color:'#a3abb3'}}>No notifications left</Typography>    
            </div>
          }
        {notifications&&notifications.length>=1?
        <div className='notifications-pagination'>
            <Pagination count={totalPages} page={page?page:1} variant="outlined" shape="rounded" showFirstButton showLastButton onChange={pageChange}/>
        </div>:
        <></>}
      
      </Paper>
  </StyledEngineProvider>
  )
}


export default Notifications