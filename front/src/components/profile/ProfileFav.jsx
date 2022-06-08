import React from "react";
import "./profilefav.css";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { MovieFavList } from "../index";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

const ProfileFav = ({ movies, myProfile }) => {
  return (
    <Box className="profile-fav-div">
      <Typography component="h4" variant="h5">
        Favourite movies
      </Typography>
      <Divider flexItem />
      {myProfile && myProfile === true ? (
        <Link className="profile-editfav" to="/profile/edit/favourites">
          <SettingsIcon fontSize="small" sx={{ verticalAlign: "sub" }} />
          <span>Edit favourites</span>
        </Link>
      ) : (
        <></>
      )}
      <Box className="profile-fav-movies">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            rowGap={1}
            columnSpacing={"10px"}
            alignItems={"center"}
          >
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={movie.movieid}
                  sx={{ alignItems: "center" }}
                >
                  <MovieFavList
                    title={movie.Movie.title}
                    posterPath={movie.Movie.poster_path}
                    status={movie.status}
                    rating={movie.rating}
                    movieid={movie.movieid}
                  />
                </Grid>
              ))
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontStyle: "italic",
                }}
              >
                No movies added to favourites
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileFav;
