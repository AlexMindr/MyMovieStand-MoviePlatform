import React,{useState} from 'react'
import './editinfo.css'
import { useDispatch } from 'react-redux';
import { Button,Box,Typography,Grid,Divider,CircularProgress } from '@mui/material'
import  {LocalizationProvider}  from '@mui/x-date-pickers/LocalizationProvider';
import  {AdapterMoment}  from '@mui/x-date-pickers/AdapterMoment';
import  {DesktopDatePicker}  from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Input from '../../auxcomponents/input/Input'
import AutocompleteCountries from '../../auxcomponents/input/AutocompleteCountries';
import useWindowDimensions from '../../auxcomponents/hooks/windowDimensions'



const EditInfo = ({initialState,currentName}) => {

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordNew, setShowPasswordNew] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [errorPassForm, setErrorPassForm] =useState(false)
    const [errorCPassForm, setErrorCPassForm] =useState(false)
    const [formError,setFormError] = useState(false)
    const dispatch = useDispatch()
    const {width,height}=useWindowDimensions()



    const handleSubmit = async (e) => {
        //TODOde verificat aici ca am schimbat ceva inainte de dispatch
        //TODO redirect la profile? or not
       e.preventDefault()
       if (formData.dateofbirth!==null)formData.dateofbirth=new Date((formData.dateofbirth));
      // dispatch(actionSignUp(formData))
    //    .then(res=>{
    //       if(res)setFormError(res)
    //       else setFormError(false)
    //      })
    //    .catch(e=>setFormError(e))
      
      
   
    }
    
   

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeLocation = (event, newValue) => {
        setFormData({...formData,location:newValue});
    }
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

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleShowPasswordNew = () => setShowPasswordNew((prevShowPassword) => !prevShowPassword);

  if(currentName)
  return (
    <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
    <Grid container spacing={2} className='editprofile-form-grid' sx={width>800?{width:500}:{width:300}}>
        {formError?
        <Grid item xs={12}>
        <Typography variant='h6' color='red'>{formError}</Typography>
        </Grid>
        :
        <></>
        }
        <Grid item xs={12}>
            <Typography variant='h5'>Your current name is {currentName}</Typography>
            <p>All fields are optional</p>
        </Grid>
        <Input name="firstName" label="First Name" handleChange={handleChange} required={false} />
        <Input name="lastName" label="Last Name" handleChange={handleChange} required={false}/>
        <Input name="gender" label="Select Gender" handleChange={handleChange} select={true} required={false} value={formData.gender?formData.gender:''}>
                    <option value='' hidden></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    
                   </Input>
        <Input name="newPass" label="Change Password" handleChange={handleChangePass} error={errorPassForm}
            type={showPasswordNew ? 'text' : 'password'} required={false} handleShowPassword={handleShowPasswordNew}
            helperText={"The new password must be at least 4 characters long and contain an uppercase letter and a number"} />

        {/* <Input name="location" label="Select your location" helperText={'This field is optional'} 
            select={true} handleChange={handleChange} required={false}>

        </Input> */}
        <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterMoment}>            
                    <DesktopDatePicker
                    label="Birthday"
                    inputFormat="DD/MM/yyyy"
                    value={formData.dateofbirth}
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField 
                        //helperText={'This field is optional'}
                         {...params} />}
                    />
                </LocalizationProvider>
        </Grid>

        <AutocompleteCountries value={formData.location} setValue={handleChangeLocation}/>

        <Grid item xs={12}>
            <textarea cols={100} rows={10} placeholder="BIO"></textarea>
        </Grid>

        <Grid item xs={12}>
            <Divider flexItem/>
            <Typography variant='h6'>In order to apply the changes you must provide your current password</Typography>
        </Grid>
        <Input name="oldPass" label="Current Password" required={true} error={errorPassForm} 
            //helperText={"The password must be at least 4 characters long and contain an uppercase letter and a number"}
            handleChange={handleChangePass} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
        <Grid item xs={12}>
            <Button type="submit"  variant="contained" color="primary" className='submit-editprofile'>
                Update Info
            </Button>
            <Button  /*onClick={clearChanges}*/ variant="text" >
                Cancel
            </Button>
        </Grid>
    </Grid>

    
</Box>
  )
  return (<div><CircularProgress/></div>)
}

export default EditInfo