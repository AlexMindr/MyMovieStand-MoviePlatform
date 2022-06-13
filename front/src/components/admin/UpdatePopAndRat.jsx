import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import {updatePopularityAndRating} from '../../api/'

const UpdatePopAndRat = () => {
    const [formError,setFormError]=useState(false)
    const [formSucc,setFormSucc] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(false)
        setFormSucc(false)
        updatePopularityAndRating()
        .then(res=>{
            setFormSucc(res.data.message)
            
        })
        .catch(e=>{
        setFormError(e.response.data.message)
        }) 
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
            <Button type="submit"  variant="contained" color="primary" >
                  Update rankings
            </Button>
        </Grid>
       
    </Grid>
    </Box>
    )
}

export default UpdatePopAndRat