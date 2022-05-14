import React,{ useState } from 'react'
import './signup.css'
import { Button, Grid, Box, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Input from '../../auxcomponents/input/Input'
import Countries from '../../auxcomponents/input/Countries'
import { useNavigate,Link } from 'react-router-dom'
import { actionSignUp} from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '',username: '',location: null,dateofbirth:null }


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [errorPassForm, setErrorPassForm] =useState(false)
    const [errorCPassForm, setErrorCPassForm] =useState(false)
    const [formError,setFormError] = useState(false)
    const dispatch = useDispatch()
    //const {user}=useSelector(state=>state.userReducer)
    //console.log(JSON.parse(localStorage.getItem('profile')))
    //console.log(user)
    const handleSubmit = async (e) => {
       e.preventDefault()
       if (formData.dateofbirth!==null)formData.dateofbirth=new Date((formData.dateofbirth));
       //de pus data toDateString() in bd?
       dispatch(actionSignUp(formData))
       .then(res=>{
          if(res)setFormError(res)
          else setFormError(false)
         })
       .catch(e=>setFormError(e))
      //de redirectionat la home/unde era inainte
      
   
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
                  {formError?
                  <Grid item xs={12}>
                  <Typography variant='h6' color='red'>{formError}</Typography>
                  </Grid>
                  :
                  <></>
                  }
                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus required={true} />
                   <Input name="lastName" label="Last Name" handleChange={handleChange} required={true}/>
                   <Input name="email" label="Email Adress" handleChange={handleChange} type="email" required={true} 
                     helperText={"This email will be used to provide updates regarding your account"}/>
                   <Input name="username" label="Username" handleChange={handleChange} type="text" required={true} 
                     helperText={"The username you choose will be used to login to your account"}/>
                   <Input name="password" label="Password" required={true} error={errorPassForm} isPassword={true}
                     helperText={"The password must be at least 4 characters long and contain an uppercase letter and a number"}
                     handleChange={handleChangePass} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   <Input name="confirmPassword" label="Repeat Password" handleChange={handleChangeConfPass} error={errorCPassForm}
                     type='password' required={true} helperText={errorCPassForm?"Passwords don't match":''} />

                   <Input name="location" label="Select your location" helperText={'This field is optional'} 
                      select={true} handleChange={handleChange} required={false}>
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
                        Sign Up
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