import React,{useState,useEffect} from 'react'
import './editprofile.css'
import {useSelector} from 'react-redux'
import {getSimpleProfile} from '../../api/index'
import { EditInfo } from '../../components'
import { StyledEngineProvider,Container,Box,Typography,Grid,Divider } from '@mui/material'

const Editprofile = () => {
    const [profile,setProfile]=useState(null)
    const {user} = useSelector(state=>state.user)

    useEffect(() => {
    
        async function getProfileData(){
           const res= await getSimpleProfile()
           const {profileUser}=res.data;
           setProfile(profileUser);
          }
        // async function getFavData(){
        //   const res= await getSimpleProfile()
        //   const {profileUser}=res.data;
        //   setFavData(profileUser);
        //   }
        getProfileData();
    },[]);

  return (
    <StyledEngineProvider injectFirst>        
        <Container component="div"  className='editprofile-container'>

         <Typography component="h3" variant='h4'>Edit your profile information</Typography>
         <Divider flexItem/>
         <Box component='div' className='editprofile-info'>
            {profile && <EditInfo currentName={profile.fullname} username={user.username}
             initialState={{ firstName: '', lastName: '', newPass: '', oldPass: '',
                location: profile.location,dateofbirth:profile.dateofbirth,gender:profile.gender,bio:profile.bio }} />
              }
         </Box>
         <br/>
         <Typography component="h3" variant='h4'>Edit your favourite movies</Typography>
         <Divider flexItem/>
         <Box component='div' className='editprofile-favorites'>

         </Box>
         
        </Container>
  </StyledEngineProvider>
  )
}

export default Editprofile