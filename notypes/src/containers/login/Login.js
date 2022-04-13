import React,{ useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import Input from './Input'
import { StyledEngineProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
/*import { signin, signup } from '../../actions/auth'
import { useDispatch } from 'react-redux'
*/

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Login= () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
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
 
    const switchMode = () => {
       setIsSignup((prevIsSignup) => !prevIsSignup)
       setShowPassword(false)
    }
    return (
        
       <Container component="div"  className='login-container'>
          <Paper className='paper-container' elevation={5}>
             
             <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
             <form className='classes.form' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                   {
                      isSignup && (
                         <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                         </>
                      )
                   }
                   <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                   <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className='submit'>
                   {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justifyContent="flex-end">
                   <Grid item>
                      <Button onClick={switchMode}>
                         {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                      </Button>
                   </Grid>
                </Grid>
             </form>
 
          </Paper>
       </Container>
    )
 }

export default Login