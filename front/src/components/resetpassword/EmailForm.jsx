import React,{useState,useEffect} from 'react'
//import './resetpassword.css'
import Input from '../../auxcomponents/input/Input'
import { Button,Typography,Grid,Box } from '@mui/material'
import { useNavigate,Link } from 'react-router-dom'
import {reset} from '../../api'


const EmailForm = ({handleEnterCode,handleChange}) => {
    //const [formData, setFormData] = useState(formDataInit)
    const [emailField,setEmailField]= useState({email:''})
    const [formError,setFormError]=useState(false)
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(false)
        reset(emailField)
        .then(res=>{
          if(res.data.message==='Success')
            handleEnterCode();
          else setFormError(res.data.message)
        })
        .catch(err=>setFormError(err.response.data.message))
     }

     const handleChangeEmail = (e) => {
      handleChange(e)
      setEmailField({[e.target.name]: e.target.value });
   }
     
      
    return (
        <Box>
             <Typography component="h3" variant='h4'>Reset your password</Typography>
             <Box component='div' className='resetpass-p'>
                <Box component='p' variant='p'>
                   If you wish to reset your password you need to provide the email address you used to sign up for MyMovieStand. If you don't have an account you can sign up for free by 
                   <Link to='/signup' className='resetpass-signup' >
                   &nbsp;clicking here
                   </Link>.
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
                    <Input name="email" label="Email" handleChange={handleChangeEmail} type="email" required={true} value={emailField.email} />
                    
                    <Grid item xs={12}>
                       
                       <Button  type='submit' variant="contained" color="primary" className='submit-resetpass'>
                          Continue
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

export default EmailForm