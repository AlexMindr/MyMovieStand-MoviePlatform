import React,{useState,useEffect} from 'react'
import './watchlistform.css'
import { Button, Grid, Box,Typography,Container,Divider,Paper } from '@mui/material'
import Input from '../../auxcomponents/input/Input'
import { useNavigate,Link } from 'react-router-dom'
import { actionCreateOrUpdateItem} from '../../store/watchlistSlice'
import { useDispatch, useSelector } from 'react-redux'

//de setat state-ul initial cu ce vine din store
const WatchlistForm = ({movieid,type,handleCloseWatchForm,title,episodesTotal,children}) => {
  const [formError,setFormError]= useState(false)
  const [isCreateOrUpdate, setIsCreateOrUpdate]= useState('create')
  const dispatch = useDispatch()
  const {watchlist}= useSelector(state=>state.watchlistReducer)
  const [formData, setFormData] = useState({status:'',rating:'',episodes:null,movieid})
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      dispatch(actionCreateOrUpdateItem(formData,isCreateOrUpdate))
      .then(res=>{
         if(res){
            setFormError(res)
            //setFormData({id,status:'',episodes:'',rating:''})
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
   
   useEffect(()=>{
      if(watchlist){
        const formFill=watchlist.filter(item=>item.movieid===movieid)
        
        if (formFill.length>0){
            setFormData({status:formFill[0].status,rating:formFill[0].rating,episodes:formFill[0].episodes,movieid})
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
  return (
    <Container className='watchlist-container-form'>
     
      <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='watchlist-form'>
                  <Grid item xs={12}>
                      <Typography variant='h6' component='h5' color='blue'>Movie title: <br/>{title}</Typography>
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
                   <Input name="status" label="Status" handleChange={handleChange} select={true} required={true} value={formData.status}>
                    <option value={null} hidden></option>
                    <option value="Plan to watch">Plan to watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                    <option value="On-hold">On-hold</option>
                    <option value="Dropped">Dropped</option>
                   </Input>
                   
                   {type==='movie'?<></>: 
                   <Input name="episodes" label="Episodes watched" handleChange={handleChange} type="text" required={true}  value={formData.episodes}/>
                   
                   }   

                   <Input name="rating" label="My score" handleChange={handleChangeInt} select={true} value={formData.rating}>
                    <option value={null} hidden></option>
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
              </Box>
               
                
         </Box>
      
    </Container>
  )
}

export default WatchlistForm