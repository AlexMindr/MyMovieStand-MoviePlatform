import React from 'react'
import './footer.css'
import {Scrollbtn} from '../../components'
import Box from '@mui/material/Box'


const Footer = () => {
  return (
  <div className='app__footer'>
      <Scrollbtn/>
      <footer>
      <Box sx={{fontStyle:'italic',fontSize:'1rem',p:2, display:'flex',flexWrap:'wrap',flexDirection:'column',textAlign:'left'}}>
        <div>
          <span>© Alexandru-Cristian Mindroiu - All rights reserved. </span>
          <span> Contact: alexandru.mindroiu@email.com </span>
        </div>
        <div className='footer-divider'><br/></div>
        <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
        <span>Credits to TMDB for all movie data.</span>
     </Box>
      </footer>
    
  </div>
  )
}

export default Footer