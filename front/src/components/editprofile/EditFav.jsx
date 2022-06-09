import React, { useEffect, useState } from "react";
import "./editfav.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Divider, Button } from "@mui/material";
import { MovieFavList } from "../";
import { getFavourites } from "../../api/index";
import { actionAddToFav, actionRemFromFav } from "../../store/watchlistSlice";
import { useSelector } from "react-redux";

const EditFav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [favourites, setFavourites] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getFavData() {
      const res = await getFavourites();
      const { favourites, watchlist } = res.data;
      setFavourites(favourites);
      setWatchlist(watchlist);
    }
    getFavData();
  }, []);

  const onFavClick = (movieid) => {
    if (favourites.length < 6) {
      setError(null);
      const favtoAdd = watchlist
        .map((item) =>
          item.movieid === movieid ? { ...item, favourite: true } : item
        )
        .filter((item) => item.movieid === movieid)[0];

      dispatch(actionAddToFav(favtoAdd)).then((res) => {
        if (res) setError(res);
        else {
          setFavourites([...favourites, favtoAdd]);
          setWatchlist(watchlist.filter((item) => item.movieid !== movieid));
        }
      });
    } else {
      setError({ message: "You cannot have more than 6 favourite movies!" });
    }
  };

  const onRemClick = (movieid) => {
    const favtoRem = favourites
      .map((item) =>
        item.movieid === movieid ? { ...item, favourite: false } : item
      )
      .filter((item) => item.movieid === movieid)[0];
    setWatchlist([...watchlist, favtoRem]);
    setFavourites(favourites.filter((item) => item.movieid !== movieid));
    dispatch(actionRemFromFav(favtoRem));
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="watchlistfav-edit-div">
      <Box>
        <Link to={`/profile/${user.username}`}>
          <Button variant="contained">Back to profile </Button>
        </Link>
      </Box>
      <Typography
        component="h4"
        variant="h5"
        sx={{ marginTop: 3, marginBottom: 1 }}
      >
        Your watchlist
      </Typography>
      {error ? (
        <Typography
          component="h5"
          variant="h6"
          sx={{ color: "red", marginBottom: 1 }}
        >
          {error.message}
        </Typography>
      ) : (
        <></>
      )}
      <Grid
        container
        rowGap={1}
        columnSpacing={"10px"}
        className="watchlistfav-edit-wl-grid"
      >
        {watchlist && watchlist.length > 0 ? (
          watchlist.map((wlItem) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              sx={{ alignItems: "center" }}
              key={wlItem.movieid}
            >
              <MovieFavList
                title={wlItem.Movie.title}
                posterPath={wlItem.Movie.poster_path}
                status={wlItem.status}
                rating={wlItem.rating}
                movieid={wlItem.movieid}
                actions={true}
                favourite={wlItem.favourite}
                onFavClick={onFavClick}
                onRemClick={onRemClick}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className="watchlist-null">
            You need to add movies to your watchlist
          </Grid>
        )}
      </Grid>

      <Divider flexItem sx={{ height: 10, marginTop: 5 }} />
      <Typography
        component="h4"
        variant="h5"
        sx={{ marginTop: 5, marginBottom: 1 }}
      >
        Your current favourites
      </Typography>

      <Grid
        container
        rowGap={1}
        columnSpacing={"10px"}
        className="watchlistfav-edit-fav-grid"
      >
        {favourites && favourites.length > 0 ? (
          favourites.map((favItem) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              sx={{ alignItems: "center" }}
              key={favItem.movieid}
            >
              <MovieFavList
                title={favItem.Movie.title}
                posterPath={favItem.Movie.poster_path}
                status={favItem.status}
                rating={favItem.rating}
                movieid={favItem.movieid}
                actions={true}
                favourite={favItem.favourite}
                onFavClick={onFavClick}
                onRemClick={onRemClick}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className="favourites-null">
            No movies added to favourites
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default EditFav;
