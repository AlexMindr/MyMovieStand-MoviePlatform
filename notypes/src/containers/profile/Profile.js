import React,{useEffect,useState} from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import { getProfile } from '../../api'
import { useSelector
 } from 'react-redux'
const Profile = () => {
  const {username}=useParams()
  const [profile,setProfile]=useState(null)
  const {user} = useSelector(state=>state.user)
  const [myProfile, setMyProfile] = useState(false)

  useEffect(() => {
    
    async function getData(){
       const res= await getProfile(username);
       setProfile(res.data.profileUser);
      }
    
    getData();
  },[username]);

  useEffect(() => {
    if(user && profile.username===user.username)
      setMyProfile(true)
    else
      setMyProfile(false)

  },[user,profile])

  return (<div>
    {profile && profile.fullname}
    </div>
    )
}

export default Profile