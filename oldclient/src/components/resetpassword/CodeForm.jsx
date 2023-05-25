import React,{useState,useEffect} from 'react'
//import './resetpassword.css'
import Input from '../../auxcomponents/input/Input'
import { Button,Typography,Grid,Box } from '@mui/material'
import { useNavigate,Link } from 'react-router-dom'
import {change} from '../../api'
import Countdown from '../../auxcomponents/functions/Countdown'

const CodeForm = ({email}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({code:'',password:''})
  const [formError,setFormError]=useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(false)
    const formSubmit = {...formData,email}
    console.log(formSubmit)
    //TODO Uncomment
    // change(formData)
    // .then(res=>{
    //   if(res.data.message==='Success')
    //     navigate('/login')
    //   else setFormError(res.data.message)
    // })
    // .catch(err=>setFormError(err.response.data.message))
 }
   
 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]:e.target.value });
}   
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
     

  return (
        <Box>
             <Typography component="h3" variant='h4'>Enter your new password</Typography>
             <Box component='div' className='resetpass-p'>
                <Box component='p' >
                    Please enter the code recieved in your email inbox. After that you can change your password.
                </Box>
             </Box>
             <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
      
                  <Grid container spacing={2} className='resetpass-form'>
                    {formError?
                    <Grid item xs={12}>
                      <Typography variant='h6' color='red'>{formError}</Typography>
                    </Grid>
                    :
                    <></>
                    }
                    <Grid item xs={12}>
                      <Countdown/>
                    </Grid>
                    <Input name="code" label="Email code" handleChange={handleChange} autoFocus required={true} value={formData.code} />
                    
                    <Input name="password" label="Enter new password" required={true} value={formData.password} isPassword={true}
                    handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    
                    <Grid item xs={12}>
                       
                       <Button  type='submit' variant="contained" color="primary" className='submit-resetpass'>
                          Change Password
                       </Button>
                       
                       <Link to='/login' className='cancel-resetpass'>
                          <Button variant="text" >
                            Cancel
                          </Button>
                        </Link>
                     </Grid>
                 </Grid>
                  
            </Box>
        </Box>
  )
}

export default CodeForm