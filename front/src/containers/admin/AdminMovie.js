import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  AddUpdateMovie,
  UpdateGenres,
  PopulateMovGen,
} from "../../components/";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminMovie = () => {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={2} sx={{ minHeight: "70vh" }}>
      <Typography component="h2" variant="h3" className="Container-title">
        Admin dashboard - movies
      </Typography>
      <Box sx={{ width: "100%", bgcolor: "var(--color-bg-container)" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="movie tabs"
            variant="fullWidth"
          >
            <Tab label="Update genres" {...a11yProps(0)} />
            <Tab label="Update/Add movie" {...a11yProps(1)} />
            <Tab label="Populate" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UpdateGenres />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddUpdateMovie />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PopulateMovGen />
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default AdminMovie;
