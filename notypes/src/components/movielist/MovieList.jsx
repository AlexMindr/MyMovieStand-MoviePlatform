import React,{useState} from 'react';
import './movielist.css'
import moment from 'moment'
import { Divider,Box,Card, CardContent, CardMedia, Button, Typography,Modal } from '@mui/material'
import {Link} from 'react-router-dom'
import {PersonOutline,StarBorderPurple500Outlined} from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MovieList = ({adult,uscertification,duration,genres,overview,posterPath,releaseDate,title,movieid,trailer,keywords,rating, children }) => {
   
   const [bgColor, setBgColor]=useState('rgb(224,224,224)');
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   
   return (
    <StyledEngineProvider injectFirst>
    <Card className='card' sx={{ bgcolor:bgColor  }}>
        
        {/*de pus culoare cand adaugam in lista la element etc.  */}
        <Typography className='title' variant="h4"><Link to={`/movies/${movieid}`}>{title}</Link></Typography>
        
        <Divider variant='horizontal' flexItem>
         {trailer?<>
           <Button onClick={handleOpen} className='trailer-movielist' variant='contained' >PV</Button>
           <Modal             
                              open={open}
                              onClose={(e) => {
                                 e.preventDefault();
                                 handleClose();
                              }}
                              aria-labelledby={title}
                              aria-describedby="trailer"
                              >
                              <Box className='trailermodal'>
                                 
                                 <Typography  sx={{width:'90vw',height:'90vh'}} component="iframe"
                                 src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1&wmode=opaque&autoplay=1`}/>
                              </Box>
            </Modal>
            </>
            :null} 
        </Divider>

        <Box component='div' className='overlay' >
           <Typography className='movielist-certification' variant="subtitle1" component='div' >
               {adult?'Adult movie':uscertification?uscertification:'-'}
           </Typography>
           <Typography className='date' variant="subtitle1" component='div' >{moment(releaseDate).format("MMM YYYY")}</Typography>
           <Divider id='divi' orientation="vertical" variant="middle" flexItem />
           <Typography variant="subtitle1" component='div'>Movie</Typography>
           <Typography variant="subtitle1" component='div'>
              Runtime: {Math.round(parseInt(duration)/60)}h {parseInt(duration)%60}min
           </Typography>
        </Box>
        
        <Box component='div' className='genres-movielist'>
            {/*la fiecare buton onclick cu link cautare */}
           
              {genres.map((genre) => (
                     <Button  variant='text' key={genre.genreid}>
                        {genre.name}
                     </Button>))}
           
        </Box>

        <CardContent className='description'>
           <CardMedia className='media' image={`https://image.tmdb.org/t/p/original/${posterPath}`} title={title}> </CardMedia>
           <Typography className='text' variant="body2" color="textSecondary" component="p">
              {overview?overview:<em>No synopsis has been added</em>}
           </Typography>
        </CardContent>

        <Box className='bottom-card' component='div'>
            <Box component='div' className='bottom-button'>
               <Button  className='cardButton' variant='text'><AddCircleIcon fontSize='medium'/></Button>            
            </Box>
            <Box component='div' className='bottom-info'>
            <Typography  component='div'>
               <PersonOutline className="icn" fontSize='small'/>
                  <span>Members</span>
            </Typography>
            <Typography  component='div'>
               <StarBorderPurple500Outlined className='icn' fontSize='small'/>
               <em >
                     {rating?rating:'N/A'}
               </em>
            </Typography>
           </Box>
        </Box>
     
    </Card>
    </StyledEngineProvider>
    )
    
};

export default MovieList;