import React, { useEffect, useState } from "react";
import "./movieposts.css";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviePosts, getMovie } from "../../api";
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
import { PostTitle } from "../../components";

const Movieposts = () => {
  const [postList, setPostsList] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [movie, setMovie] = useState(null);
  const [err, setErr] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const pageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    async function getMoviebck() {
      const res = await getMovie(parseInt(id));
      if (res.data) setMovie(res.data);
      else {
        setErr("Movie doesn't exist!");
        navigate("/error");
      }
    }
    getMoviebck();
  }, [id, navigate]);

  useEffect(() => {
    async function getData() {
      const res = await getMoviePosts(parseInt(id), page, 10);
      setPostsList(res.data.posts);
      setTotalPages(res.data.totalPages);
    }

    getData();
  }, [id, page]);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2}>
        {movie && err === null ? (
          <>
            <Typography component="h2" variant="h3" className="Container-title">
              Discussions
            </Typography>
            <Box className="allposts-container">
              <Typography
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
              <Box className="allposts-addpost">
                <Link to={`/movies/${movie.movieid}/addpost`}>
                  Start a discussion
                </Link>
              </Box>
              <Divider flexItem sx={{ m: 1 }} />
              {postList === null ? (
                <div className="loading-allposts">
                  <CircularProgress />
                </div>
              ) : postList.length >= 1 ? (
                <Box sx={{ flexGrow: 1 }} className="allposts-box">
                  <Grid container rowGap={1} columnSpacing={"10px"}>
                    {postList.map((post) => (
                      <Grid
                        item
                        xs={12}
                        key={post.postid}
                        className="allposts-post"
                      >
                        <PostTitle post={post} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <div className="loading-allposts">
                  <Typography
                    variant="h4"
                    sx={{ fontStyle: "oblique", color: "#a3abb3" }}
                  >
                    No posts have been added for this movie
                  </Typography>
                </div>
              )}
            </Box>
          </>
        ) : (
          <div className="loading-allposts">{err}</div>
        )}
        {postList && postList.length >= 1 ? (
          <div className="allposts-pagination">
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

export default Movieposts;
