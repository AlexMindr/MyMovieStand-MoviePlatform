import React, { useEffect, useState } from "react";
import "./home.css";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  HomeFeatured,
  PostTitle,
  HomeReview,
  MovieHomeList,
} from "../../components";
import { getHomeMovies, getHomePosts, getHomeReviews } from "../../api";

const Home = () => {
  const [mostPopular, setMostPopular] = useState(null);
  const [bestRated, setBestRated] = useState(null);
  const [homePosts, setHomePosts] = useState(null);
  const [homeReviews, setHomeReviews] = useState(null);

  useEffect(() => {
    async function getPosts() {
      const res = await getHomePosts();
      setHomePosts(res.data);
    }
    async function getReviews() {
      const res = await getHomeReviews();
      setHomeReviews(res.data);
    }
    async function getMovies() {
      const res = await getHomeMovies();
      const { mostPopular, bestRated } = res.data;
      setMostPopular(mostPopular);
      setBestRated(bestRated);
    }
    // async function getNews(){
    //   const res= await getHomePosts();
    //   setHomePosts(res.data);
    // }
    getMovies();
    getPosts();
    getReviews();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2}>
        <Typography component="h2" variant="h3" className="Container-title">
            Home
        </Typography>
          
        <Box component="div" className="Container-home" sx={{p:2}}>
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              News
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
          </Box>
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              Most popular movies
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container rowGap={1}>
                {mostPopular && mostPopular.length > 0 ? (
                  mostPopular.map((movie, index) => (
                    <Grid item xs={12} key={movie.movieid}>
                      <MovieHomeList movie={movie} index={index} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} className="items-null">
                    <Typography
                      component="h5"
                      variant="h5"
                      sc={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      Not enough movies added by users
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              Top rated
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container rowGap={1}>
                {bestRated && bestRated.length > 0 ? (
                  bestRated.map((movie, index) => (
                    <Grid item xs={12} key={movie.movieid}>
                      <MovieHomeList movie={movie} index={index} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} className="items-null">
                    <Typography
                      component="h5"
                      variant="h5"
                      sc={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      Not enough movies added by users
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              Latest forum discussions
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container rowGap={1}>
                {homePosts && homePosts.length > 0 ? (
                  homePosts.map((post) => (
                    <Grid item xs={12} key={post.postid}>
                      <PostTitle post={post} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} className="items-null">
                    <Typography
                      component="h5"
                      variant="h5"
                      sc={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      No discussions have been added
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              Latest user reviews
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container rowGap={1}>
                {homeReviews && homeReviews.length > 0 ? (
                  homeReviews.map((review) => (
                    <Grid
                      item
                      xs={12}
                      sm={11}
                      md={10}
                      lg={9}
                      key={review.reviewid}
                    >
                      <HomeReview review={review} MaxHeight={90} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} className="items-null">
                    <Typography
                      component="h5"
                      variant="h5"
                      sc={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      No reviews have been added
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Paper>
    </StyledEngineProvider>
  );
};

export default Home;
