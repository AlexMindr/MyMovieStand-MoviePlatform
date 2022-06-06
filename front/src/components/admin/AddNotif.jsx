import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Input from '../../auxcomponents/input/Input';
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import {addNotification,addGlobalNotification} from '../../api/'
//import DraftTextArea from '../../auxcomponents/input/DraftTextarea'

const AddNotif = () => {
    const [formData, setFormData] = useState({username:'',content:''})
    const [formError,setFormError]=useState(false)
    const [formSucc,setFormSucc] = useState(false)
    const [globalNotif,setGlobalNotif]=useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(false)
        setFormSucc(false)
        if(globalNotif===false)
            addNotification(formData)
            .then(res=>{
                setFormSucc(res.data.message)
                
            })
            .catch(e=>{
            setFormError(e.response.data.message)
            })
        if(globalNotif===true)
            addGlobalNotification(formData)
            .then(res=>{
                setFormSucc(res.data.message)
                
            })
            .catch(e=>{
            setFormError(e.response.data.message)
            })
     }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
    //  const handleChangeContent = (newValue) => {
    //     setFormData({ ...formData, content:newValue }); 
    // };
    const handleCancel=()=>{
        setFormError(false)
        setFormSucc(false)
        setFormData({user:'',content:''})
    }
    
  
  return (
    <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
        
    <Grid container spacing={2} className='login-form'>
        {formError?
        <Grid item xs={12}>
            <Typography variant='h6' color='red'>{formError}</Typography>
        </Grid>
        :
        <></>
        }
        {formSucc?
        <Grid item xs={12}>
            <Typography variant='h6' color='blue'>{formSucc}</Typography>
        </Grid>
        :
        <></>
        }
        <Grid item xs={12}>
            {/* <Button variant='outlined' onClick={handleGlobal}>{globalNotif===false?'Change to global notif':'Change to user notif'}</Button> */}
            <ToggleButton
                sx={{color:'red'}}
                color='success'
                value="check"
                selected={globalNotif}
                onChange={() => {
                    setGlobalNotif(!globalNotif);
                }}
                >
                {globalNotif===false?'Toggle to global notif':'Toggle to user notif'}
            </ToggleButton>
        </Grid>
        {globalNotif===false?
        <Grid item xs={12}>
            <Input name="username" label="Username" handleChange={handleChange} type="text" 
                required={true} value={formData.username} helperText={'Username of the user you want to send the notification to'}/>
        </Grid>
        :<></>}
        <Grid item xs={12}>
            {/* <DraftTextArea field={formData.bio} setField={handleChangeContent} placeholder={"Notification content"} textMaxLength={200}/> */}
            <Input name="content" label="Content of notification" handleChange={handleChange} type="text" maxLength={750}
                required={true} value={formData.content} helperText={'Enter the content of notification'}/>
        </Grid>
        <Grid item xs={12}>
            <Button type="submit"  variant="contained" color="primary" >
                  Send notification
            </Button>
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={handleCancel} >
                  Cancel
            </Button>
        </Grid>
    </Grid>

</Box>      
  )
}
export default AddNotif