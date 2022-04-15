import React,{ useState } from 'react'
import './signup.css'
import { Button, Grid, Box, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Input from '../../auxcomponents/input/Input'
import Countries from '../../auxcomponents/input/Countries'
import { useNavigate,Link } from 'react-router-dom'
import {signup} from '../../api'
/*import { signin, signup } from '../../actions/auth'
import { useDispatch } from 'react-redux'
*/

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '',username: '',location: null,dateofbirth:null }


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [errorPassForm, setErrorPassForm] =useState(false)
    const [errorCPassForm, setErrorCPassForm] =useState(false)
    //const [initialDate,setInitialDate]=useState(false)
    // const history = useHistory()
    // const dispatch = useDispatch()
 
    const handleSubmit = async (e) => {
       e.preventDefault()
       if (formData.dateofbirth!==null)formData.dateofbirth=new Date((formData.dateofbirth));
       //console.log(formData.dateofbirth)
       await signup(formData).then(res=>console.log(res.data.result,res.data.token)).catch(err=>console.log(err.response.data))
       //de pus data toDateString() in bd 
       /*if (isSignup) {
          dispatch(signup(formData, history))
       } else {
          dispatch(signin(formData, history))
       }*/
   
    }
 
    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleChangeDate = (newValue) => {
        setFormData({ ...formData, dateofbirth:newValue });    
    };

    const handleChangePass = (e) => {
      let password = e.target.value
      let re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_.-:;]{4,}$")
      
      if (re.test(password)) {
         setErrorPassForm(false)
         setFormData({ ...formData, password });   
     } else {
         setErrorPassForm(true)
     }
      
    };

    const handleChangeConfPass = (e) => {
      let confirmPassword = e.target.value

      let re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_.-:;]{4,}$")
      
      if (re.test(confirmPassword) && confirmPassword===formData.password) {
         setErrorCPassForm(false)
         setFormData({ ...formData, confirmPassword });   
     } else {
         setErrorCPassForm(true)
     }
     
      
    };
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
 
    
  return (
         <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='signup-form'>
                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus required={true} />
                   <Input name="lastName" label="Last Name" handleChange={handleChange} required={true}/>
                   <Input name="email" label="Email Adress" handleChange={handleChange} type="email" required={true} helperText={"Your email address"}/>
                   <Input name="username" label="Username" handleChange={handleChange} type="text" required={true} helperText={"You will use it to login to your account"}/>
                   <Input name="password" label="Password" required={true} error={errorPassForm} 
                     helperText={"The password must be at least 4 characters long and contain an uppercase letter and a number"}
                     handleChange={handleChangePass} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   <Input name="confirmPassword" label="Repeat Password" handleChange={handleChangeConfPass} error={errorCPassForm}
                     type='password' required={true} helperText={errorCPassForm?"Passwords don't match":''} />

                   <Input name="location" label="Select your location" helperText={'This field is optional'} select={true} handleChange={handleChange} required={false}>
                       <Countries/>
                   </Input>
                   <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>            
                            <DesktopDatePicker
                            label="Birthday"
                            inputFormat="DD/MM/yyyy"
                            value={formData.dateofbirth}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField helperText={'This field is optional'} {...params} />}
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