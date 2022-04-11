import React from 'react';
import './movielist.css'
import moment from 'moment'
import { Divider,Box,Card, CardContent, CardMedia, Button, Typography } from '@mui/material'
import {Link} from 'react-router-dom'
import {PersonOutline,StarBorderPurple500Outlined} from '@mui/icons-material';
import { StyledEngineProvider } from '@mui/material/styles';

const MovieList = ({uscertification,duration,genres,overview,posterPath,releaseDate,title,tmbdId,movieid, children }) => {
    


    return (
    <StyledEngineProvider injectFirst> 
    <Card className='card'>
        
        {/*de pus culoare cand adaugam in lista la element etc. de pus adult, de pus genres top */}
        <Typography className='title' variant="h6"><Link to={`/movies/${movieid}`}>{title}</Link></Typography>
        
        
        <Divider variant="middle" flexItem/>

        <Box component='div' className='overlay' >
           <Button variant='contained'>PV</Button>
           <Typography className='date' variant="subtitle1" component='div' >{moment(releaseDate).format("MMM YYYY")}</Typography>
           <Divider id='divi' orientation="vertical" variant="middle" flexItem />
           <Typography variant="subtitle1" component='div'>Type Movie</Typography>
           <Typography variant="subtitle1" component='div'>{duration}</Typography>
        </Box>
        
        <Box component='div' className='genres-movielist'>
            {/*la fiecare buton onclick cu link cautare */}
           <Typography variant="subtitle2" component='div'>
              {genres.map((genre) => (
                     <Button  variant='outlined' key={genre.genreid}>
                        {genre.name}
                     </Button>))}
           </Typography>
        </Box>

        <CardContent className='description'>
           <CardMedia className='media' image={`https://image.tmdb.org/t/p/original/${posterPath}`} title={title}> </CardMedia>
           <Typography className='text' variant="body2" color="textSecondary" component="p">{overview}</Typography>
        </CardContent>

        <Box component='div' className='overlay2'>
           <Typography className="bottomCard" variant='span'><PersonOutline className="icn" fontSize='small'/>Members</Typography>
           <Typography className='bottomCard' variant='span'><StarBorderPurple500Outlined className='icn' fontSize='small'/>Score</Typography>
           <Button className='cardButton'>ADD TO LIST</Button>
        </Box>
     
    </Card>
    </StyledEngineProvider>
    )
    
};

export default MovieList;