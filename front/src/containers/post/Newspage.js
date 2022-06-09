import React,{useState,useEffect} from 'react'
import './newspage.css'
import { useNavigate, useParams } from "react-router-dom";
import { getNews } from "../../api";
import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
  StyledEngineProvider,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NewsTitle } from "../../components";


const Newspage = () => {
    const [newsList, setNewsList] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    //const [movie, setMovie] = useState(null);
    //const [err, setErr] = useState(null);
  //  const { id } = useParams();
//    const navigate = useNavigate();
  
    const pageChange = (event, value) => {
      setPage(value);
    };
  
    // useEffect(() => {
    //   async function getMoviebck() {
    //     const res = await getMovie(parseInt(id));
    //     if (res.data) setMovie(res.data);
    //     else {
    //       setErr("Movie doesn't exist!");
    //       navigate("/error");
    //     }
    //   }
    //   getMoviebck();
    // }, [id, navigate]);
  
    useEffect(() => {
      async function getData() {
        const res = await getNews( page, 10);
        setNewsList(res.data.posts);
        setTotalPages(res.data.totalPages);
      }
  
      getData();
    }, [page]);
  
    return (
      <StyledEngineProvider injectFirst>
        <Paper elevation={2}>
              <Typography component="h2" variant="h3" className="Container-title">
                News
              </Typography>
              <Box className="allnews-container">
                {/* <Typography
                  variant="h4"
                  component="h3"
                  sx={{ fontSize: "1.3rem" }}
                >
                  You are viewing discussions about the movie:
                </Typography>
                <Link to={`/movies/${movie.movieid}`}>
                  <Typography
                    variant="h5"
                    component="h4"
                    sx={{ fontSize: "1.25rem" }}
                  >
                    {movie.title}
                  </Typography>
                </Link>
                <Box className="allnews-addnews">
                  <Link to={`/movies/${movie.movieid}/addnews`}>
                    Start a discussion
                  </Link>
                </Box> */}
                <Divider flexItem sx={{ m: 1 }} />
                {newsList === null ? (
                  <div className="loading-allnews">
                    <CircularProgress />
                  </div>
                ) : newsList.length >= 1 ? (
                  <Box sx={{ flexGrow: 1 }} className="allnews-box">
                    <Grid container rowGap={1} columnSpacing={"10px"}>
                      {newsList.map((news) => (
                        <Grid
                          item
                          xs={12}
                          key={news.newsid}
                          className="allnews-news"
                        >
                          <NewsTitle news={news} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <div className="loading-allnews">
                    <Typography
                      variant="h4"
                      sx={{ fontStyle: "oblique", color: "#a3abb3" }}
                    >
                      No news have been added yet
                    </Typography>
                  </div>
                )}
              </Box>
         
          {newsList && newsList.length >= 1 ? (
            <div className="allnews-pagination">
              <Pagination
                count={totalPages}
                page={page ? page : 1}
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={pageChange}
              />
            </div>
          ) : (
            <></>
          )}
        </Paper>
      </StyledEngineProvider>
    );
  };
  


export default Newspage