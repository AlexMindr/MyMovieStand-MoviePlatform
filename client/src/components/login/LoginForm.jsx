import React,{ useState } from 'react'
import './login.css'
import { Button, Grid, Box,Typography } from '@mui/material'
import Input from '../../auxcomponents/input/Input'
import { useNavigate,Link,useLocation  } from 'react-router-dom'
import { actionLogin} from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {  username: '', password: '' }


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [formError,setFormError]=useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const toRedirect = location.state?.from?.pathname || "/";
     //console.log(toRedirect)
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      dispatch(actionLogin(formData,navigate,toRedirect==='reset-password'?'/':toRedirect))
      .then(res=>{
         if(res){
            setFormError(res)
            setFormData(initialState)
         }
         //else setFormError(false)
        })
      .catch(e=>{
         setFormError(e)
         setFormData(initialState)
      })
   
   }
 
    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
    }
 
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    
    
  return (
         <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='login-form'>
                  {formError?
                  <Grid item xs={12}>
                  <Typography variant='h6' color='red'>{formError}</Typography>
                  </Grid>
                  :
                  <></>
                  }
                  <Input name="username" label="Username" handleChange={handleChange} type="text" required={true} value={formData.username} />
                  
                   <Input name="password" label="Password" required={true} value={formData.password} isPassword={true}
                   handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   <Grid item xs={12}>
                     <Button type="submit"  variant="contained" color="primary" className='submit-login'>
                        Sign In
                     </Button>
                     <Link to='/reset-password' className='forgot-login'>
                        <Button variant="text" >
                           Reset password
                        </Button>
                     </Link>
                   </Grid>
               </Grid>
                
         </Box>
 
  )
}

export default Login;