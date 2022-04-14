import React,{ useState } from 'react'
import './signup.css'
import { Button, Grid, Box, Typography,TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Input from '../input/Input'
import Countries from '../input/Countries'
import { useNavigate,Link } from 'react-router-dom'
/*import { signin, signup } from '../../actions/auth'
import { useDispatch } from 'react-redux'
*/

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '',username: '',location: '',dateofbirth:new Date() }


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [initialDate]=useState(new Date())
    // const classes = useStyles()
    // const history = useHistory()
    // const dispatch = useDispatch()
 
    const handleSubmit = (e) => {
       e.preventDefault()
       if(new Date(formData.dateofbirth._d).toDateString()===initialDate.toDateString())
            formData.dateofbirth='';
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

    
    const handleChange2 = (newValue) => {
        setFormData({ ...formData, dateofbirth:newValue });
        // console.log(new Date(newValue).toDateString())
        // console.log(initialDate.toDateString())
        // console.log(new Date(newValue._d).toDateString()===new Date().toDateString())    
    };
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
 
    
  return (
         <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='signup-form'>
                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus required={true} />
                   <Input name="lastName" label="Last Name" handleChange={handleChange} required={true}/>
                   <Input name="email" label="Email Adress" handleChange={handleChange} type="email" required={true}/>
                   <Input name="username" label="Username" handleChange={handleChange} type="text" required={true}/>
                   <Input name="password" label="Password" required={true} 
                   handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' required={true} />
                   <Input name="location" label="Select your location" select={true} handleChange={handleChange} required={false}>
                       <Countries/>
                   </Input>
                   <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>            
                            <DesktopDatePicker
                            label="Birthday"
                            inputFormat="DD/MM/yyyy"
                            value={formData.dateofbirth}
                            onChange={handleChange2}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                   </Grid>
                   <Grid item xs={12}>
                     <Button type="submit"  variant="contained" color="primary" className='submit-signup'>
                        Sign In
                     </Button>
                     <Link to='/' className='cancel-signup'>
                        <Button variant="text" >
                           Cancel
                        </Button>
                     </Link>
                   </Grid>
               </Grid>

                
         </Box>
 
  )
}

export default Signup;