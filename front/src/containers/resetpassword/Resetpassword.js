import React,{useState} from 'react'
import './resetpassword.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { EmailForm,CodeForm } from '../../components'

const Resetpassword = () => {
    const [formData, setFormData] = useState({})
    const [enterCode,setEnterCode]= useState(false)
    const [formError,setFormError]=useState(false)
  
   
      const handleChange = (e) => {
         
         setFormData({ ...formData, [e.target.name]: e.target.value });
      }
   
      const handleEnterCode = ()=>{if(formData.email)setEnterCode(true)}
      
    return (
      <Paper elevation={2}>        
         <Box component="div"  className='resetpass-container' sx={{p:2}}>
            {enterCode===false?
               <EmailForm handleChange={handleChange} handleEnterCode={handleEnterCode} setFormError={setFormError}/>
             :
               <CodeForm email={formData.email} handleChange={handleChange} setFormError={setFormError}/>
            }
         </Box>
      </Paper>
           
    )
  }
  

export default Resetpassword