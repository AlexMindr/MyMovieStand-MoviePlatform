import React,{useState,useEffect} from 'react'
import './reviewadd.css'
import DraftTextArea from '../../auxcomponents/input/DraftTextarea'
import { Box,Typography,Divider,Grid,Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { getReviewOfMovie } from '../../api'
import { useDispatch } from 'react-redux'
import { actionCreateOrUpdateReview,actionDeleteReview } from '../../store/reviewSlice'

const ReviewAdd = ({movieid,title}) => {
  const [field,setField]=useState(null)
  const [formError,setFormError]=useState(null)
  const [isCreateOrUpdate,setIsCreateOrUpdate]=useState('create')
  const {reviews} = useSelector(state=>state.review)
  const navigate= useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData={content:field,movieid}
    //console.log(formData)
    dispatch(actionCreateOrUpdateReview(formData,isCreateOrUpdate))
    .then(res=>{
      if(res)setFormError(res)
      else setFormError(false)
     })
    .catch(e=>setFormError(e))

  }
  const deleteReview = (e) =>{
    dispatch(actionDeleteReview(movieid))
    clearChanges()
    window.location.reload(false);
  }

  const clearChanges = () =>{
    navigate(`/movies/${movieid}`)
  }


  useEffect(()=>{
    if (reviews ){
      const currentExists=reviews.filter(item=> item.movieid===movieid)
      if(currentExists.length>0)
        setIsCreateOrUpdate('update')
      else 
        setIsCreateOrUpdate('create')
    }
  },[movieid,reviews])

  useEffect(()=>{
    async function getReviewfrombck(){
      const res= await getReviewOfMovie(movieid);
      const content=res.data.content
      setField(content);
      
   }     
    if(isCreateOrUpdate==='update'){
      getReviewfrombck()
    }
  },[isCreateOrUpdate,movieid])

  return (
    <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit} className='reviewadd-form'>
    
    <Grid container spacing={2} className='reviewadd-form-grid' >
        <Grid item xs={12}>
          <Typography variant='h5' component='h4'>Your review for the movie:</Typography>
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
           {isCreateOrUpdate==='update'? 
            <DraftTextArea field={field} setField={setField} placeholder={"Write your review here"} ok={1} textMaxLength={5000}/>
            :
            <DraftTextArea  setField={setField} placeholder={"Write your review here"} textMaxLength={5000}/> 
            }
            
            
        </Grid>
        <Grid item xs={12}>
            <Button type="submit"  variant="contained" color="primary" className='submit-reviewadd'>
                {isCreateOrUpdate==='update'?'Update review':'Post review'}
            </Button>
            <Button  onClick={clearChanges} variant="text" >
                Cancel
            </Button>
        </Grid>
        <Grid item xs={12}>
            {isCreateOrUpdate==='update'?
              <Button  onClick={deleteReview} variant="contained" color="primary" className='submit-reviewadd'>
                Delete review
              </Button>
              :
              <></>
            }
            
        </Grid>
     </Grid>
    </Box>
  )
}

export default ReviewAdd