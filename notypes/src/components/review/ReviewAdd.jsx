import React,{useState} from 'react'
import './reviewadd.css'
import DraftTextArea from '../../auxcomponents/input/DraftTextarea'
import { Box,Typography,Divider,Grid,Button } from '@mui/material'

const ReviewAdd = ({movieid,title}) => {
  const [field,setField]=useState(null)
  const [formError,setFormError]=useState(null)

  const handleSubmit = () => {
    let formData={field,movieid}
    console.log(formData)
  }

  const clearChanges = () =>{
    setField(null)
  }

  return (
    <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit} className='reviewadd-form'>
    
    <Grid container spacing={2} className='reviewadd-form-grid' >
        <Grid item xs={12}>
          <Typography variant='h5' component='h4'>Write a review for the movie: {title}</Typography>
          <Divider flexItem sx={{m:1}}/>
        </Grid>
        {formError?
        <Grid item xs={12}>
        <Typography variant='h6' color='red'>{formError}</Typography>
        </Grid>
        :
        <></>
        }
     
        <Grid item xs={12} className='reviewadd-textarea'>
            <DraftTextArea field={field} setField={setField} placeholder={"Write your review here"}/>
        </Grid>
        <Grid item xs={12}>
            <Button type="submit"  variant="contained" color="primary" className='submit-reviewadd'>
                Post review
            </Button>
            <Button  onClick={clearChanges} variant="text" >
                Cancel
            </Button>
        </Grid>
    </Grid>
      </Box>
  )
}

export default ReviewAdd