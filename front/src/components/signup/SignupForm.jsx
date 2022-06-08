import React,{ useState } from 'react'
import './signup.css'
import { Button, Grid, Box, TextField, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Input from '../../auxcomponents/input/Input'
import { Link } from 'react-router-dom'
import { actionSignUp} from '../../store/userSlice'
import { useDispatch} from 'react-redux'
import AutoCompleteCountries from '../../auxcomponents/input/AutocompleteCountries'
import { useNavigate } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '',
 confirmPassword: '',username: '',location: null,dateofbirth:null,gender:null }


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [errorfirstNameForm, setErrorfirstNameForm] =useState(false)
    const [errorlastNameForm, setErrorlastNameForm] =useState(false)
    const [errorUserForm, setErrorUserForm] =useState(false)
    const [errorPassForm, setErrorPassForm] =useState(false)
    const [errorCPassForm, setErrorCPassForm] =useState(false)
    const [formError,setFormError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
       e.preventDefault()
       if(formData.dateofbirth!==null && new Date().getFullYear()-new Date(formData.dateofbirth).getFullYear()>1)
        setFormError(false)
       else 
        setFormError('Invalid date')
       if (formData.dateofbirth!==null)formData.dateofbirth=new Date((formData.dateofbirth));
       if(!errorCPassForm && !errorPassForm && !errorUserForm && !errorfirstNameForm && !errorlastNameForm && !formError)
       dispatch(actionSignUp(formData))
       .then(res=>{
          if(res)setFormError(res)
          else navigate(`/home`)
         })
       .catch(e=>setFormError(e))
        
    }
    
   

    const handleChange = (e) => {
      if(e.target.name==='username'){
        if(e.target.value.length>2){
          setFormData({ ...formData, [e.target.name]: e.target.value });
          setErrorUserForm(false);
         }
         else 
           setErrorUserForm(true)  
      }
      else if( e.target.name==='lastName'){
       let re= new RegExp("^([A-Z]){1,}")
       if (re.test(e.target.value)){
        setErrorlastNameForm(false);
       setFormData({ ...formData, [e.target.name]: e.target.value });
       }
       else 
       setErrorlastNameForm(true)
      }
      else if(e.target.name==='firstName' ){
        let re= new RegExp("^([A-Z]){1,}")
        if (re.test(e.target.value)){
         setErrorfirstNameForm(false);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        else 
        setErrorfirstNameForm(true)
       }
      else 
        setFormData({ ...formData, [e.target.name]: e.target.value });
       
    };

    
    const handleChangeDate = (newValue) => {
        setFormData({ ...formData, dateofbirth:newValue });      
    };

    const handleChangeLocation = (event, newValue) => {
      setFormData({...formData,location:newValue});
  }
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
                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus required={true} maxLength={100} minLength={1}
                   error={errorfirstNameForm} helperText={errorfirstNameForm?'Field must start with uppercase!':''}/>
                   <Input name="lastName" label="Last Name" handleChange={handleChange} required={true} maxLength={100} minLength={1}
                   error={errorlastNameForm} helperText={errorlastNameForm?'Field must start with uppercase!':''}/>
                   <Input name="email" label="Email Adress" handleChange={handleChange} type="email" required={true} 
                     helperText={"This email will be used to provide updates regarding your account"} maxLength={150}/>
                   <Input name="username" label="Username" handleChange={handleChange} type="text" required={true} maxLength={70}
                     helperText={errorUserForm?'Field must be at least 3 characters long!':
                     "The username you choose will be used to login to your account"} error={errorUserForm}/>
                   <Input name="password" label="Password" required={true} error={errorPassForm} isPassword={true} maxLength={200}
                     helperText={"The password must be at least 4 characters long and contain an uppercase letter and a number"}
                     handleChange={handleChangePass} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                   <Input name="confirmPassword" label="Repeat Password" handleChange={handleChangeConfPass} error={errorCPassForm}
                     type='password' required={true} helperText={errorCPassForm?"Passwords don't match":''} />
                   <Input name="gender" label="Select Gender" handleChange={handleChange} select={true} required={false} value={formData.gender?formData.gender:''}>
                    <option value='' hidden></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    
                   </Input>
                   <AutoCompleteCountries  value={formData.location} setValue={handleChangeLocation} helperText={'This field is optional'}/>

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