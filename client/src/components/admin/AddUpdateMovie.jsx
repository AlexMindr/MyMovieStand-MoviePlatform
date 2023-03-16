import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Input from '../../auxcomponents/input/Input';
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton';
import {addMovie,updateMovie} from '../../api/'

const AddUpdateMovie = () => {
    const [formData, setFormData] = useState({movieid:''})
    const [formError,setFormError]=useState(false)
    const [formSucc,setFormSucc] = useState(false)
    const [isAdd,setIsAdd] =useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(false)
        setFormSucc(false)
        if(isAdd)
            addMovie(formData)
            .then(res=>{
                setFormSucc(res.data.message)
                
            })
            .catch(e=>{
            setFormError(e.response.data.message)
            })
        else
            updateMovie(formData)
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
    const handleCancel=()=>{
        setFormError(false)
        setFormSucc(false)
        setFormData({movieid:''})
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
        <Grid item xs={12} >
            <ToggleButton
                sx={{color:'red'}}
                color='success'
                value="check"
                selected={isAdd}
                onChange={() => {
                    setIsAdd(!isAdd);
                }}
                >
                Toggle to {isAdd===false?'add':'update'}
            </ToggleButton>
        </Grid>
        
        <Grid item xs={12}>
            <Input name="movieid" label={isAdd?'Movieid from TMDB':'Movieid from MMS'} handleChange={handleChange} type="text" 
                required={true} value={formData.movieid} helperText={`Enter the movieid of the movie you want to ${isAdd?'add':'update'}`}/>
        </Grid>
        <Grid item xs={12}>
            <Button type="submit"  variant="contained" color="primary" >
                  {isAdd?'Add movie':'Update movie'}
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

export default AddUpdateMovie
