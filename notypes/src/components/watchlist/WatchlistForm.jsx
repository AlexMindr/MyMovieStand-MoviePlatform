import React,{useState} from 'react'
import './watchlistform.css'
import { Button, Grid, Box,Typography,Container } from '@mui/material'
import Input from '../../auxcomponents/input/Input'
import { useNavigate,Link } from 'react-router-dom'
import { actionLogin} from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const WatchlistForm = ({id,type,handleCloseWatchForm,title,children}) => {
  const [formError,setFormError]= useState(false)
  const dispatch = useDispatch()
  //const {user}= useSelector(state=>state.userReducer)
  const [formData, setFormData] = useState({id,status:'',episodes:'',rating:''})
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      .then(res=>{
         if(res){
            setFormError(res)
            setFormData()
         }
         else {
           setFormError(false)
           handleCloseWatchForm()
          }
        
        })
      .catch(e=>{
         setFormError(e)
         setFormData({id,status:'',episodes:'',rating:''})
      })
   }
   

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 }

  return (
    <Container className='watchlist-container-form'>
      <Box  sx={{ flexGrow: 1 }} component='form' onSubmit={handleSubmit}>
    
                <Grid container spacing={2} className='watchlist-form'>
                  <Grid item xs={12}>
                      <Typography variant='h6' component='h5' color='blue'>Movie title: <br/>{title}</Typography>
                   </Grid>
                  {formError?
                  <Grid item xs={12}>
                  <Typography variant='h6' color='red'>{formError}</Typography>
                  </Grid>
                  :
                  <></>
                  }
                   <Input name="status" label="Status" handleChange={handleChange} select={true} required={true} value={formData.status}>
                    <option value={null}>Select status</option>
                    <option value="Plan to watch">Plan to watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                    <option value="On-hold">On-hold</option>
                    <option value="Dropped">Dropped</option>
                   </Input>
                   
                   {type==='movie'? formData.status!=='Plan to watch'?
                   <input name="episodes" label="Episodes watched" type="hidden"  value={1}/>
                   :
                   <input name="episodes" label="Episodes watched" type="hidden"  value={0}/>
                   :
                   <Input name="episodes" label="Episodes watched" handleChange={handleChange} type="text" required={true}  value={formData.episodes}/>
                   
                   }   

                   <Input name="score" label="My score" handleChange={handleChange} select={true} required={true} value={formData.score}>
                    <option value={null}>Select score</option>
                    <option value="1">1 - Offensive</option>
                    <option value="2">2 - Appalling</option>
                    <option value="3">3 - Horrible</option>
                    <option value="4">4 - Bad</option>
                    <option value="5">5 - Average</option>
                    <option value="6">6 - Fine</option>
                    <option value="7">7 - Good</option>
                    <option value="8">8 - Great</option>
                    <option value="9">9 - Marvellous</option>
                    <option value="10">10 - Masterpiece</option>
                    
                   </Input>
                     
                   <Grid item xs={12}>
                     <Button type="submit"  variant="contained" color="primary" className='submit-watchlist'>
                        Submit
                     </Button>
                   </Grid>
               </Grid>
                
         </Box>
    </Container>
  )
}

export default WatchlistForm