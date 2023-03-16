import React from "react";
import "./editfavourites.css";
import { EditFav } from "../../components";
import {
  StyledEngineProvider,
  Paper,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const Editfavourites = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2} component="div" className="editfav-container">
        <Typography component="h2" variant="h3" className="Container-title">
          Edit your favourites
        </Typography>
        <Divider flexItem />
        <Box component="div" className="editfav-favorites">
          <EditFav />
        </Box>
      </Paper>
    </StyledEngineProvider>
  );
};

export default Editfavourites;
