import React, { useEffect, useState } from "react";
import "./home.css";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from '@mui/material/CircularProgress'
import {
  HomeRecomm,
  PostTitle,
  HomeReview,
  MovieHomeList,
  NewsTitle
} from "../../components";
import { getHomeMovies, getHomePosts, getHomeReviews, getUserRecommendations,getHomeNews } from "../../api";
import { useSelector } from "react-redux";


const Home = () => {
  const [mostPopular, setMostPopular] = useState(null);
  const [bestRated, setBestRated] = useState(null);
  const [homePosts, setHomePosts] = useState(null);
  const [homeNews, setHomeNews] = useState(null);
  const [homeReviews, setHomeReviews] = useState(null);
  const [homeRecomm, setHomeRecomm] = useState(null);
  const [loading,setLoading]=useState(true)
  const {user} = useSelector(state=>state.user)

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
    async function getNews(){
      const res= await getHomeNews();
      setHomeNews(res.data);
    }
    async function getRecomm() {
      const res = await getUserRecommendations();
      setHomeRecomm(res.data);
    }
    getMovies();
    getPosts();
    getReviews();
    if(user)
    getRecomm();
    getNews()
    setLoading(false)
  }, [user]);

  
  if(loading)
    return(<Box
      sx={{ display: "flex", position: "absolute", right: "50%", top: "40%" }}
    >
      <CircularProgress />
    </Box>
    )
  else
  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2}>
        <Typography component="h2" variant="h3" className="Container-title">
            Home
        </Typography>
          
        <Box component="div" className="Container-home" sx={{p:2}}>
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              Latest News
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container rowGap={1} >
                {homeNews && homeNews.length > 0 ? (
                  homeNews.map((news) => (
                    <Grid item xs={12} key={news.postid} >
                      <NewsTitle news={news} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} className="items-null">
                    <Typography
                      component="h5"
                      variant="h5"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        fontSize:'1.2rem'
                      }}
                    >
                      No news have been added
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        fontSize:'1.2rem'
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        fontSize:'1.2rem'
                      }}
                    >
                      Not enough movies added by users
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
          {user?
          <Box>
            <Typography component="h3" variant="h4" className="Section-title">
              Recommended for you
            </Typography>
            <Divider flexItem sx={{ m: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container rowGap={1} columns={15}>
                {homeRecomm && homeRecomm.length > 0 ? (
                   homeRecomm.map((movie, index) => (
                    <Grid item xs={5} md={3} lg={2} key={movie.movieid}>
                      <HomeRecomm movie={movie} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={15} className="items-null">
                    <Typography
                      component="h5"
                      variant="h5"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        fontSize:'1.2rem'
                      }}
                    >
                      Not enough movies added to your watchlist
                    </Typography>
                  </Grid>
                )} 
              </Grid>
            </Box>
          </Box>
          :<></>}
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        fontSize:'1.2rem'
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        fontSize:'1.2rem'
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
