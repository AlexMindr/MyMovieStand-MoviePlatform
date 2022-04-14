import React,{ useState } from 'react'
import './login.css'
import { Button, Grid, Box } from '@mui/material'
import Input from '../input/Input'
import { useNavigate,Link } from 'react-router-dom'
/*import { signin, signup } from '../../actions/auth'
import { useDispatch } from 'react-redux'
*/

const initialState = {  username: '', password: '' }


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    // const classes = useStyles()
    // const history = useHistory()
    // const dispatch = useDispatch()
 
    const handleSubmit = (e) => {
       e.preventDefault()
 
       /*if (isSignup) {
          dispatch(signup(formData, history))
       } else {
          dispatch(signin(formData, history))
       }*/
 //      console.log(formData, history);
    }
 
    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
    }
 
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
 
    
  return (
         <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='login-form'>
                   
                   <Input name="username" label="Username" handleChange={handleChange} type="text" required={true}/>
                   <Input name="password" label="Password" required={true}
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