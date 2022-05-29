import React,{useState,useEffect} from 'react'
import './commadd.css'
import DraftTextArea from '../../auxcomponents/input/DraftTextarea'
import { Box,Typography,Divider,Grid,Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { addComm } from '../../api'

const CommAdd = ({postid,addState}) => {
    const [formData, setFormData] = useState({comment_content:null,postid})
    const [formError,setFormError]=useState(null)
    //const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      console.log(formData)
      e.preventDefault()
      if(formData.comment_content.blocks[0].text.length>=1){
        setFormError(null)
        
        addComm(formData)
        .then(res=>{
           addState(false)
          //TODO check error from bck?
          //navigate(`/movies/${movieid}/comms/comm/${commid}`)
        })
        .catch(e=>setFormError(e))
      }
      else 
          setFormError('Field cannot be empty!')
      
  
    }
  
    
  
  
   const setField = (newValue) => {
       setFormData({ ...formData, comment_content:newValue }); 
   };
  
  
    const clearChanges = () =>{
      addState(false)
    }
  
    return (
      <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit} className='commadd-form'>
      
      <Grid container spacing={2} className='commadd-form-grid' >
        <Grid item xs={12}>
          <Typography variant='h5' component='h4'>Add comment for this discussion</Typography>
          <Divider flexItem sx={{m:1}}/>
        </Grid>
          {formError?
          <Grid item xs={12}>
          <Typography variant='h6' color='red'>{formError}</Typography>
          </Grid>
          :
          <></>
          }
          
           
          <Grid item xs={12} className='commadd-textarea'>
              <DraftTextArea  setField={setField} placeholder={"Discuss about the movie here"} textMaxLength={1000}/> 
              
          </Grid>
          <Grid item xs={12}>
              <Button type="submit"  variant="contained" color="primary" className='submit-commadd'>
                  Post 
              </Button>
              <Button  onClick={clearChanges} variant="text" >
                  Cancel
              </Button>
          </Grid>
          
       </Grid>
      </Box>
    )
}

export default CommAdd