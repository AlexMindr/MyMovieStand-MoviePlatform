import React, { useEffect, useState } from "react";
import "./newspostpage.css";
import { getPostContent, getPostComments, getMovie } from "../../api";
import {
  Button,
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
  StyledEngineProvider,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostContent, PostComm, CommAdd } from "../../components";

const Newsnewspostpage = () => {
    const [postComments, setPostComments] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [addComm, setAddComm] = useState(false);
    const [movie, setMovie] = useState(null);
    const [err, setErr] = useState(null);
    const [refreshContent, setRefreshContent] = useState(false);
    const [refreshComm, setRefreshComm] = useState(false);
    const { movieid, postid } = useParams();
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
  
    const pageChange = (event, value) => {
      setPage(value);
    };
  
    const handleAddComm = (e) => {
      setAddComm(true);
    };
    useEffect(() => {
      async function getMoviebck() {
        const res = await getMovie(parseInt(movieid));
        if (res.data) setMovie(res.data);
        else {
          setErr("Movie doesn't exist!");
          navigate("/error");
        }
      }
      async function getComments() {
        const res = await getPostComments(parseInt(postid), page, 8);
        setPostComments(res.data.comments);
        setTotalPages(res.data.totalPages);
      }
      async function getContent() {
        const res = await getPostContent(parseInt(postid));
        if (res.data) setPostContent(res.data);
        else {
          setErr("News doesn't exist!");
          navigate("/error");
        }
      }
      getMoviebck();
      getContent();
      getComments();
    }, [movieid, postid, navigate,page]);
  
    useEffect(() => {
      async function getComments() {
        const res = await getPostComments(parseInt(postid), page, 8);
        setPostComments(res.data.comments);
        setTotalPages(res.data.totalPages);
      }
      if (refreshComm === true) {
        setPostComments();
        setRefreshComm(false);
        getComments();
      }
    }, [postid, refreshComm,page]);
  
    useEffect(() => {
      async function getContent() {
        const res = await getPostContent(parseInt(postid));
        if (res.data) setPostContent(res.data);
        else setErr("Post doesn't exist!");
      }
      if (refreshContent === true) {
        setPostContent();
        setRefreshContent(false);
        getContent();
      }
    }, [postid, refreshContent]);
  
    return (
      <StyledEngineProvider injectFirst>
        <Paper elevation={2}>
          {movie && err === null ? (
            <>
              <Typography component="h2" variant="h3" className="Container-title">
                Movie News
              </Typography>
              <Box className="newspostpage-box">
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{ paddingLeft: 2, paddingTop: 2, fontSize: "1.3rem" }}
                >
                  About movie:
                </Typography>
                <Link to={`/movies/${movie.movieid}`}>
                  <Typography
                    variant="h5"
                    component="h4"
                    sx={{ paddingLeft: 2, paddingBottom: 2, fontSize: "1.25rem" }}
                  >
                    {movie.title}
                  </Typography>
                </Link>
                <Divider flexItem sx={{ m: 1 }} />
  
                <PostContent
                  postContent={postContent}
                  setRefresh={setRefreshContent}
                  news={true}
                />
  
                <Box className="newspostpage-addcomment">
                  {user ? (
                    <>
                      {addComm === false ? (
                        <Button onClick={handleAddComm} variant="outlined">
                          Add a comment
                        </Button>
                      ) : (
                        <CommAdd
                          postid={postid}
                          addState={setAddComm}
                          setRefreshComm={setRefreshComm}
                        />
                      )}
                    </>
                  ) : (
                    <Link to={"/login"} state={{ from: location }}>
                      Login to add comment
                    </Link>
                  )}
                </Box>
                <Box className="newspostpage-comments">
                  {postComments === null ? (
                    <div className="loading-newspostpage">
                      <CircularProgress />
                    </div>
                  ) : postComments && postComments.length >= 1 ? (
                    <Box sx={{ flexGrow: 1 }} className="newspostpage-box">
                      <Grid container rowGap={2} columnSpacing={"10px"}>
                        {postComments.map((post) => (
                          <Grid
                            item
                            xs={12}
                            key={post.ucid}
                            className="newspostpage-postcomm"
                          >
                            <PostComm
                              postComment={post}
                              setRefreshComm={setRefreshComm}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : (
                    <div className="loading-newspostpage">
                      <Typography
                        variant="h4"
                        sx={{ fontStyle: "oblique", color: "#a3abb3" }}
                      >
                        No comments have been added
                      </Typography>
                    </div>
                  )}
                </Box>
              </Box>
            </>
          ) : (
            <div className="loading-newspostpage">{err}</div>
          )}
          {postComments && postComments.length >= 1 ? (
            <div className="newspostpage-pagination">
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

export default Newsnewspostpage