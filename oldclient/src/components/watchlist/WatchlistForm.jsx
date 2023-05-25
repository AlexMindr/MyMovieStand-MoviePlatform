import React,{useState,useEffect} from 'react'
import './watchlistform.css'
import { Button, Grid, Box,Typography,Container,Divider } from '@mui/material'
import Input from '../../auxcomponents/input/Input'
import { Link } from 'react-router-dom'
import { actionCreateOrUpdateItem, actionDelWlItem} from '../../store/watchlistSlice'
import {actionAddNotif} from '../../store/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

const WatchlistForm = ({movieid,type,handleCloseWatchForm,title,children}) => {
  const [formError,setFormError]= useState(false)
  const [isCreateOrUpdate, setIsCreateOrUpdate]= useState('create')
  const dispatch = useDispatch()
  const {watchlist}= useSelector(state=>state.watchlist)
  const [formData, setFormData] = useState({status:'',rating:null,episodes:null,movieid})
  const {user} = useSelector(state=>state.user)

    const handleSubmit = async (e) => {
      e.preventDefault()
      dispatch(actionCreateOrUpdateItem(formData,isCreateOrUpdate))
      .then(res=>{
         if(res){
            setFormError(res)
            
         }
         else {
           setFormError(false)
           dispatch(actionAddNotif({content:`Successfuly ${isCreateOrUpdate==='create'?'added':'updated'} movie ${title}`}))
           handleCloseWatchForm()
          }
        
        })
      .catch(e=>{
         setFormError(e)
      })
   }
   
   useEffect(()=>{
      if(watchlist){
        const formFill=watchlist.filter(item=>item.movieid===movieid)
        
        if (formFill.length>0){
            setFormData({status:formFill[0].status,rating:formFill[0].rating?formFill[0].rating:null,episodes:formFill[0].episodes,movieid})
            setIsCreateOrUpdate('update')
        }
      }
   },[movieid,watchlist])

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   }

   const handleChangeInt = (e) => {
   setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
   }

   const handleDelete = (e) => {
      e.preventDefault()
      dispatch(actionDelWlItem(formData.movieid))
      .then(res=>{
         if(res){
            setFormError(res)
            //dispatch(actionAddNotif({content:`Something went wrong when updating the movie`}))
           
         }
         else {
           setFormError(false)
           handleCloseWatchForm()
          }
        
        })
      .catch(e=>{
         setFormError(e)
         //setFormData({id,status:'',episodes:'',rating:''})
      })
   }

  return (
    <Container className='watchlist-container-form'>
      {user?
      <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='watchlist-form'>
                  <Grid item xs={12}>
                      <Typography variant='h6' component='h5' color='blue'>Movie: <br/>{title}</Typography>
                   </Grid>
                   <Grid item xs={12}>
                      <Divider orientation='horizontal' flexItem/>
                   </Grid>
                  {formError?
                  <Grid item xs={12}>
                  <Typography variant='h6' color='red'>{formError}</Typography>
                  </Grid>
                  :
                  <></>
                  }
                   <Input name="status" label="Status" handleChange={handleChange} select={true} required={true} value={formData.status?formData.status:''}>
                    <option value='' hidden></option>
                    <option value="Plan to watch">Plan to watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                    <option value="On-hold">On-hold</option>
                    <option value="Dropped">Dropped</option>
                   </Input>
                   
                   {type==='movie'?<></>: 
                   <Input name="episodes" label="Episodes watched" handleChange={handleChange} type="text" required={true}  value={formData.episodes}/>
                   
                   }   

                   <Input name="rating" label="My score" handleChange={handleChangeInt} select={true} value={formData.rating?formData.rating:''}>
                    <option value='' hidden></option>
                    <option value={1}>1 - Offensive</option>
                    <option value={2}>2 - Appalling</option>
                    <option value={3}>3 - Horrible</option>
                    <option value={4}>4 - Bad</option>
                    <option value={5}>5 - Average</option>
                    <option value={6}>6 - Fine</option>
                    <option value={7}>7 - Good</option>
                    <option value={8}>8 - Great</option>
                    <option value={9}>9 - Marvellous</option>
                    <option value={10}>10 - Masterpiece</option>
                    
                   </Input>
              </Grid>      
              <Box component='div' className='watchlist-form-button'>
                     <Button type="submit"  variant="contained" color="primary" className='submit-watchlist'>
                        Submit
                     </Button>
                     {isCreateOrUpdate==='update'?
                     <Button variant="contained" color="primary" className='submit-watchlist' onClick={handleDelete}>
                        Delete
                     </Button>
                     :<></>}
              </Box>
               
                
         </Box>
     :<Box sx={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',minHeight:'50vh'}}>
        <Link to='/login'>Login to add/edit movie</Link>
     </Box> }
    </Container>
  )
}

export default WatchlistForm