import React from 'react'
import './movieimghoriz.css'
import { ImageList,ImageListItem } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box >
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const MovieImgHoriz = ({images,title,children}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box component='div' className='imageroot'>
    //     <ImageList  className="images" >
    //         {images && images.posters.map((item) => (
    //             <ImageListItem  key={item.file_path}>
    //                 <img
    //                 src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
    //                 alt={title}
    //                 loading="lazy" 
    //                 />
    //             </ImageListItem>
    //         ))}
    //         {children}
    //     </ImageList>
    // </Box>
    <Box component='div' className='imageroot' sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="image-tabs">
          <Tab label="Posters" {...a11yProps(0)} />
          <Tab label="Backdrops" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ImageList  className="images" >
            {images && images.posters.map((item) => (
                <ImageListItem  key={item.file_path}>
                    <img
                    src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
                    alt={title}
                    loading="lazy" 
                    />
                </ImageListItem>
            ))}
            {children}
        </ImageList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageList className="images-bck" >
            {images && images.backdrops.map((item) => (
                <ImageListItem  key={item.file_path}>
                    <img
                    src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
                    alt={title}
                    loading="lazy" 
                    />
                </ImageListItem>
            ))}
            {children}
        </ImageList>
      </TabPanel>
    </Box>

  )
}

export default MovieImgHoriz