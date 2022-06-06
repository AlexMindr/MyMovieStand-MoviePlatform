import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Input from '../../auxcomponents/input/Input';
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import {updateGenres} from '../../api/'

const UpdateGenres = () => {
    //const [formData, setFormData] = useState({reviewid:''})
    const [formError,setFormError]=useState(false)
    const [formSucc,setFormSucc] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(false)
        setFormSucc(false)
        updateGenres()
        .then(res=>{
            setFormSucc(res.data.message)
            
        })
        .catch(e=>{
        setFormError(e.response.data.message)
        }) 
    }
    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //  }
    // const handleCancel=()=>{
    //     setFormError(false)
    //     setFormSucc(false)
    // //    setFormData({reviewid:''})
    // }
  
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
            <Button type="submit"  variant="contained" color="primary" >
                  Update Genres
            </Button>
        </Grid>
       
    </Grid>
    </Box>
    )
}

export default UpdateGenres