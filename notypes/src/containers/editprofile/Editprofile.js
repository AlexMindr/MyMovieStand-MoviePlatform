import React,{useState,useEffect} from 'react'
import './editprofile.css'
import {useSelector} from 'react-redux'
import {getSimpleProfile} from '../../api/index'

const Editprofile = () => {
    const [profile,setProfile]=useState(null)
    const {user} = useSelector(state=>state.user)

    useEffect(() => {
    
        async function getData(){
           const res= await getSimpleProfile()
           const {profileUser}=res.data;
           setProfile(profileUser);
          }
        getData();
    },[]);


  return (
    <div>{user.username}</div>
  )
}

export default Editprofile