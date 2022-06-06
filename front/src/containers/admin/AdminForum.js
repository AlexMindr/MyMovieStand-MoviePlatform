import React,{useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container  from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import {DelResPost,DelResReview,DelResComm} from '../../components/'

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
          <Box sx={{ p: 3 }}>
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


const AdminForum = () => {
    const [value, setValue] = useState(0);
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
      };
  
    return (
    <Container>
      <Paper elevation={2} sx={{minHeight:'70vh'}}>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChangeTab} aria-label="forum tabs" variant='fullWidth'>
                <Tab label="Del/Res Post" {...a11yProps(0)} />
                <Tab label="Del/Res Comm" {...a11yProps(1)} />
                <Tab label="Del/Res Review" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DelResPost/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DelResComm/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DelResReview/>
            </TabPanel>
        </Box>
      </Paper>
    </Container>
    );
}

export default AdminForum