import React, { useState, useEffect } from "react";
import "./homerecomm.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const HomeRecomm = ({movie}) => {
  return (
    <Box className="Box-movierecomm">
      <Link to={`/movies/${movie.movieid}`}>
        <Box className="Box-movierecomm-img">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </Box>
        <Box className="Box-movierecomm-link">
          {movie.title.length > 25
            ? movie.title.slice(0, 25) + "..."
            : movie.title}
        </Box>
      </Link>
    </Box>
  );
};

export default HomeRecomm;
