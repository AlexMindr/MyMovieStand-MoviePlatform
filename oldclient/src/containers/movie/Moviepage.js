import React from "react";
import "./moviepage.css";
import { Movie } from "../../components";
import { useParams } from "react-router-dom";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Paper from "@mui/material/Paper";

const Moviepage = () => {
  const { id } = useParams();
  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2} component="div" className="container-movie">
        <Movie movieid={parseInt(id)} />
      </Paper>
    </StyledEngineProvider>
  );
};

export default Moviepage;
