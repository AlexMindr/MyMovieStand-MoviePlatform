import React,{useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Input from '../../auxcomponents/input/Input';
import Container  from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import {DeleteUser,AddNotif} from '../../components/'

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
  


const AdminUser = () => {
    const [value, setValue] = useState(0);
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
      };
  
    return (
    <Container>
      <Paper elevation={2} sx={{minHeight:'70vh'}}>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChangeTab} aria-label="movie tabs" variant='fullWidth'>
                <Tab label="Delete User" {...a11yProps(0)} />
                <Tab label="Send notification" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DeleteUser/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddNotif/>
            </TabPanel>
        </Box>
      </Paper>
    </Container>
    );
}

export default AdminUser