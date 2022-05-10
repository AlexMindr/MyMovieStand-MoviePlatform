import React,{useEffect,useState} from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import {ProfileAvatar,ProfileWatchlist} from '../../components'
import { getProfile } from '../../api'
import { useSelector} from 'react-redux'
import { Container,Grid,Box,Typography,StyledEngineProvider } from '@mui/material'



const Profile = () => {
  
  const {username}=useParams()
  const [profile,setProfile]=useState(null)
  const [status,setStatus]=useState(null)
  const {user} = useSelector(state=>state.user)
  const [myProfile, setMyProfile] = useState(false)
  const [joined, setJoined] =useState(null)


  useEffect(() => {
    
    async function getData(){
       const res= await getProfile(username);
       const {profileUser,joined}=res.data;
       setProfile(profileUser);
       setJoined(joined)
       const {watching,dropped,onhold,plantowatch,totalStatus,completed}=res.data;
       setStatus({completed,watching,onhold,plantowatch,dropped,totalStatus})
      }
    
    getData();
  },[username]);

  useEffect(() => {
    if(user && profile &&profile.username===user.username)
      setMyProfile(true)
    else
      setMyProfile(false)
  },[user,profile])

  return (
    <StyledEngineProvider injectFirst>
    <Container className='container-profile'>
        <Box className='' sx={{ flexGrow: 1 }} component='div'>
            <Grid container spacing={1} className=''>
                <Grid item className='profile-title-item'  xs={12} md={12}>
                  <Typography component='h3' variant='h4'>{myProfile?'My':user.username+"'s"} profile</Typography>
                </Grid>
                <Grid item className='profile-avatar-item'  xs={12} md={6}>
                  <ProfileAvatar profile={profile} joined={joined}/>
                </Grid>
                <Grid item className=''  xs={12} md={6}>
                  <ProfileWatchlist status={status} />
                </Grid>
            </Grid>
         </Box>
    </Container>
    </StyledEngineProvider>
    )
}

export default Profile