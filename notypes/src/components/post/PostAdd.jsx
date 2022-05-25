import React,{useState,useEffect} from 'react'
import './postadd.css'
import DraftTextArea from '../../auxcomponents/input/DraftTextarea'
import { Box,Typography,Divider,Grid,Button } from '@mui/material'
import Input from '../../auxcomponents/input/Input'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { getReviewOfMovie } from '../../api'

const PostAdd = ({movieid,title}) => {
  const [formData, setFormData] = useState({title:'',field:null})
  const [formError,setFormError]=useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    //if(formData.title!=='' && formData.field!==null)
    //console.log(formData)
    // dispatch(actionCreateOrUpdateReview(formData,isCreateOrUpdate))
    // .then(res=>{
    //   if(res)setFormError(res)
    //   else setFormError(false)
    //  })
    // .catch(e=>setFormError(e))

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


 const setField = (newValue) => {
     setFormData({ ...formData, field:newValue }); 
 };

  const deleteReview = (e) =>{
    //dispatch(actionDeleteReview(movieid))
    clearChanges()
    window.location.reload(false);
  }

  const clearChanges = () =>{
    //navigate(`/movies/${movieid}`)
  }

  return (
    <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit} className='reviewadd-form'>
    
    <Grid container spacing={2} className='reviewadd-form-grid' >
        <Grid item xs={12}>
          <Typography variant='h5' component='h4'>Discuss about the movie:</Typography>
          <Link to={`/movies/${movieid}`}><Typography variant='h5' component='h5'>{title}</Typography></Link>
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
            <Input name="title" label="Choose a title" handleChange={handleChange} type="text" required={true} value={formData.title}/>
        </Grid>
         
        <Grid item xs={12} className='reviewadd-textarea'>
            <DraftTextArea  setField={setField} placeholder={"Discuss about the movie here"}/> 
            
        </Grid>
        <Grid item xs={12}>
            <Button type="submit"  variant="contained" color="primary" className='submit-reviewadd'>
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

export default PostAdd